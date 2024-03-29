# Generated by Django 2.2.25 on 2021-12-26 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0002_appointmentpaymentdetail_appointmentprice'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='meeting_id',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='meeting_join_url',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='meeting_password',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
