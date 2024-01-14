"""Define URL patterns for accounts."""

from django.urls import path, include

from . import views

app_name = 'accounts'
urlpatterns = [
    # Login a user
    path('', include('django.contrib.auth.urls')),
    # Register a user
    path('register/', views.register, name='register'),
    # User settings
    path('settings/', views.settings, name='settings'),
    # Check email
    path('check_email/', views.check_email, name='check_email'),
    # Check user
    path('check_user/', views.check_user, name='check_user'),
]