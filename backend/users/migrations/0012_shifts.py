# Generated by Django 2.2.24 on 2021-11-28 16:24

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_auto_20211119_1948'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shifts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skills', models.ManyToManyField(related_name='provider_shifts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
