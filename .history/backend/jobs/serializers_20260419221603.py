from rest_framework import serializers
from django.contrib.auth.models import User
from .models import JobApplication

class RegisterSerializer(serializers.ModelSerializer)