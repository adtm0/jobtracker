from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class JobApplication(models.Model):
  STATUS_CHOICES = [
    ('applied', 'Applied'),
    ('interview', 'Interview'),
    ('offer', 'Offer'),
    ('rejected', 'Rejected'),
  ]
  
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
  company = models.CharField(max_length=255)
  role = models.CharField(max_length=255)
  status = 
