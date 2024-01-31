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
    # Handle forms for comments.
    path('new_comment/<int:post_id>', views.new_comment, name='new_comment'),
    # TOS
    path('tos/', views.tos, name='tos'),
]