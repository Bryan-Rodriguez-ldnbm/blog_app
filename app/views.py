from django.shortcuts import render

from .models import Post, Comment

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger 

def index(request):
    """Render the home page."""
    return render(request, 'index.html', {})

def posts(request):
    posts = Post.objects.order_by('-date_added')
    paginator = Paginator(posts, 4)
    page_num = request.GET.get('page')

    try:
        page_obj = paginator.page(page_num)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    context = {'page_obj': page_obj}

    return render(request, 'posts.html', context)

def post(request, post_id):
    """Render a single post."""
    post = Post.objects.get(id=post_id)
    comments = Comment.objects.order_by('-date_added')
    context = {'post': post,
               'comments': comments}
    return render(request, 'post.html', context)