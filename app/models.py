from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    """A blog post."""

    title = models.CharField(max_length=150)
    text = RichTextField()
    image = models.ImageField(upload_to='images/', blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    locked = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'posts'

    def __str__(self):
        """Return a string reprsentation of the model."""
        return f"{self.title}"
    
class Comment(models.Model):
    """A comment by a client."""
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'comments'

    def __str__(self):
        return f"{self.text}"