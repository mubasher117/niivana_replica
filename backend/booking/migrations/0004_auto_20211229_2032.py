# Generated by Django 2.2.25 on 2021-12-29 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0003_auto_20211226_1229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='meeting_id',
            field=models.BigIntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='meeting_join_url',
            field=models.TextField(default=None, max_length=255, null=True),
        ),
    ]
