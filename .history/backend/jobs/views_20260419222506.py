from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Count
from datetime import date, timedelta

from .models import JobApplication
from .serializers import RegisterSerializer, UserSerializer, JobApplicationSerializer

class RegisterView(generics.CreateAPIView)