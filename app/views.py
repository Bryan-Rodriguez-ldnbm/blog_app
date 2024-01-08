from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse

from .models import Post, Comment
from .forms import CommentForm

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger 

def index(request):
    """Render the home page."""

    return render(request, 'index.html', {})

def posts(request):
    """Render a list of posts."""

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
    comments = Comment.objects.filter(post=post).order_by('-date_added')
    context = {'post': post,
               'comments': comments}
    
    return render(request, 'post.html', context)

def new_comment(request, post_id):
    """Handle a form to create a user comment."""

    post = get_object_or_404(Post, id=post_id)

    if request.method == 'POST':
        # POST data submitted; process it!
        form = CommentForm(data=request.POST)
        if form.is_valid():
            new_comment = form.save(commit=False)
            new_comment.post = post
            new_comment.save()

            # success
            return JsonResponse({"success": True}, status=201)
        else:
            return JsonResponse({"success": False}, status=401)
    
    return render('app:post', post_id=post_id)