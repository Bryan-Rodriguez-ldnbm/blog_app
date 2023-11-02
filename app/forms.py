from django import forms

from .models import Comment

class CommentForm(forms.ModelForm):
    """A form for a comment."""

    class Meta:
        model = Comment
        fields = ['text']