# Generated by Django 4.2.5 on 2023-10-10 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_post_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('text', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name_plural': 'comments',
            },
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'verbose_name_plural': 'posts'},
        ),
    ]
