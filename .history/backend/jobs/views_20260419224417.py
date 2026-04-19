from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Count
from datetime import date, timedelta

from .models import JobApplication
from .serializers import RegisterSerializer, UserSerializer, JobApplicationSerializer

class RegisterView(generics.CreateAPIView):
  serializer_class = RegisterSerializer
  permission_classes = [permissions.AllowAny]
  
  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    return Response({
      'user': UserSerializer(user).data,
      'access':str(refresh.access_token),
      'refresh': str(refresh),
    }, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
  permission_classes = [permissions.AllowAny]
  
  def post(self, request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
      return Response({'error': 'Invalid credentials'}, status = status.HTTP_401_UNAUTHORIZED)
    refresh = RefreshToken.for_user(user)
    return Response({
      'user': UserSerializer(user).data,
      'access': str(refresh.access_token),
      'refresh': str(refresh),
    })
    
class MeView(generics.RetrieveAPIView):
  serializer_class = UserSerializer
  
  def get_object(self):
    return self.request.user
  
class JobListCreateView(generics.ListCreateAPIView):
  serializer_class = JobApplicationSerializer
  
  def get_queryset(self):
    qs = JobApplication.objects.filter(user=self.request.user)
    status_filter = self.request.query_params.get('status')
    search = self.request.query_params.get('search')
    if status_filter:
      qs = qs.filter(status=status_filter)
    if search:
      qs = qs.filter(company__icontains=search) | qs.filter(role__icontains=search)
    return qs
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
    
class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = JobApplicationSerializer
  
  def get_queryset(self):
    return JobApplication.objects.filter(user=self.request.user)
  
  
class StatsView(APIView):
  def get(self, request):
    qs = JobApplication.objects.filter(user=request.user)
    counts = qs.values('status').annotate(count=Count('status'))
    status_map = {item['status']: item['count'] for item in counts}
    
    total = qs.count()
    applied = status.map.get('applied', 0)
    interview = status.map.get('interview', 0)
    offer = status.map.get('offer', 0)
    rejected = status.map.get('rejected', 0)
    
    response_rate = round((interview + offer + rejected) / total * 100) if total > 0 else 0
    offer_rate = round(offer / total * 100) if total > 0 else 0
    
    ten_days_ago = date.today() - timedelta(days=10)
    follow_up_due = qs.filter(status='applied', date_applied__lte=ten_days_ago).count()
    
    best_role_qs = (
      qs.filter(status__in=['interview', 'offer'])
      .values('role')
      .annotate(count=Count('role'))
      .order_by('-count')
      .first()
    )
    best_role = best_role_qs['role'] if best_role_qs else None
    
    return Response({
      'total':
        'appli'
    })
      
  