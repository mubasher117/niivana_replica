# Generated by Django 2.2.24 on 2021-11-19 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_availability_schedule'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='availability',
            name='end_date_time',
        ),
        migrations.RemoveField(
            model_name='availability',
            name='start_date_time',
        ),
        migrations.AddField(
            model_name='availability',
            name='end_time',
            field=models.TimeField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='availability',
            name='start_time',
            field=models.TimeField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='availability',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
