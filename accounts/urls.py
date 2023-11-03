"""Define URL patterns for accounts."""

from django.urls import path, include

from . import views

app_name = 'accounts'
urlpatterns = [
    # default auth urls
    path('', include('django.contrib.auth.urls')),
    path('/login', views.login, name='login'),
]