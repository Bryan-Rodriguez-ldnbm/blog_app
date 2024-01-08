import json

from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.views.decorators.http import require_POST
from django.http import JsonResponse

def register(request):
    """Register a new user."""

    if request.method != 'POST':
        form = UserCreationForm()
    else:
        # Process completed form.
        form = UserCreationForm(data=request.POST)

        if form.is_valid():
            new_user = form.save()
            # Log user in and redirect
            login(request, new_user)
            return redirect('app:posts')

    context = {'form': form}
    return render(request, 'registration/register.html', context)

@require_POST
def check_email(request):

    data = json.loads(request.body.decode('utf-8'))
    email = data.get('email')

    if email is not None:
        exists = User.objects.filter(email=email).exists()
        if exists:
            return JsonResponse({"message": "Email is taken"}, status=409)
        else:
            return JsonResponse({"message": "Email is available"}, status=200)
    else:
        return JsonResponse({"message": "bad request"}, status=400)

def settings(request):
    """Show settings of a user."""

    return render(request, 'registration/settings.html', {})
