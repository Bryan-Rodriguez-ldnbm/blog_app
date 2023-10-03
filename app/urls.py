"""Definre URL patterns."""

from django.urls import path

from . import views

app_name = 'app'
urlpatterns = [
    # Home page
    path('', views.index, name='index'),
    path('posts/', views.posts, name='posts'),
]