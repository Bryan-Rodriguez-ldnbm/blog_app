"""Define URL patterns for accounts."""

from django.urls import path, include

from . import views

app_name = 'accounts'
urlpatterns = [
    # Login a user
    path('', include('django.contrib.auth.urls')),
    # Register a user
    path('register/', views.register, name='register'),
]