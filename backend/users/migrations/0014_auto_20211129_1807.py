# Generated by Django 2.2.24 on 2021-11-29 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20211129_1640'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='availability',
            name='day',
        ),
        migrations.AddField(
            model_name='availability',
            name='is_available',
            field=models.BooleanField(default=False),
        ),
    ]