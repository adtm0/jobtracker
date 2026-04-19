from rest_framework import serializers
from django.contrib.auth.models import User
from .models import JobApplication

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, min_length=8)
  
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password']
    
  def create(self, validated_data)