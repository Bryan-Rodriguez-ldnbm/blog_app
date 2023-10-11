from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class Post(models.Model):
    """A blog post."""
    title = models.CharField(max_length=150)
    text = RichTextField()
    image = models.ImageField(upload_to='images/', blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'posts'

    def __str__(self):
        """Return a string reprsentation of the model."""
        return f"{self.title}"
    
class Comment(models.Model):
    """A comment by a user."""
    
    date_added = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'comments'

    def __str__(self):
        return f"{self.text}"