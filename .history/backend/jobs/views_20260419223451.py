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
      qs = qs.filter(status=status_)
      
  