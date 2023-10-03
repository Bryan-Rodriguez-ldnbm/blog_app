from django.shortcuts import render

from .models import Post

# Create your views here.
def index(request):
    """Render the home page."""
    return render(request, 'index.html', {})

def posts(request):
    """Render the blog page."""
    posts = Post.objects.order_by('-date_added')
    context = {'page_obj': posts}
    return render(request, 'posts.html', context)