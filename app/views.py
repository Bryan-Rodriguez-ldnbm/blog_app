from django.shortcuts import render

# Create your views here.
def index(request):
    """Render the home page."""
    return render(request, 'index.html', {})

def posts(request):
    """Render the blog page."""
    return