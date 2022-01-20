# Generated by Django 2.2.24 on 2021-11-29 16:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_shifts'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shifts',
            old_name='skills',
            new_name='providers',
        ),
        migrations.AddField(
            model_name='shifts',
            name='create_date_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shifts',
            name='end_time',
            field=models.TimeField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='shifts',
            name='from_date',
            field=models.DateField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='shifts',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='shifts',
            name='start_time',
            field=models.TimeField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='shifts',
            name='to_date',
            field=models.DateField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='shifts',
            name='updated_date_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]