"""Definre URL patterns."""

from django.urls import path

from . import views

app_name = 'app'
urlpatterns = [
    # Home page.
    path('', views.index, name='index'),
    # Blog posts.
    path('posts/', views.posts, name='posts'),
    # Details for a single post.
    path('posts/<int:post_id>', views.post, name='post'),
]