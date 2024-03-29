# Generated by Django 2.2.24 on 2021-12-11 14:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flag', models.CharField(choices=[('urgent', 'Urgent'), ('not_urgent', 'Not Urgent')], default='urgent', max_length=255)),
                ('appointment_help', models.CharField(choices=[('mental_health', 'Mental Health'), ('lactation_support', 'Lactation Support')], default='mental_health', max_length=255)),
                ('create_date_time', models.DateTimeField(auto_now_add=True)),
                ('updated_date_time', models.DateTimeField(auto_now=True)),
                ('booking_time', models.DateTimeField()),
                ('zoom_link', models.TextField(blank=True, null=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_appoinment', to=settings.AUTH_USER_MODEL)),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provider_appoinment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
