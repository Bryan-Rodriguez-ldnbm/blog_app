# Generated by Django 4.2.5 on 2023-10-17 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_comment_alter_post_options'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
