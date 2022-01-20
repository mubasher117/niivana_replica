from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """
    name = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    age = models.BigIntegerField(
        null=True,
        blank=True,
    )
    location = models.TextField(
        null=True,
        blank=True,
    )
    refferal_code = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    hear_about_us = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    stripe_customer_id = models.CharField(max_length=150, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="user_photo", null=True, blank=True)
    reset_code = models.IntegerField(null=True, blank=True)
    reset_expiry = models.DateTimeField(null=True, blank=True)
    zoom_id = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    price = models.IntegerField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    specialization = models.TextField(null=True, blank=True, help_text="Please Write Specialization in Comma Seprated Format")
    is_available = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def social_profile_url(self):
        if self.socialaccount_set.all():
            return self.socialaccount_set.all()[0].get_avatar_url()
        return ""

class Feedback(models.Model):
    subject = models.CharField(
        null=True,
        blank=True,
        max_length=255,
    )
    message = models.TextField(
        null=True,
        blank=True,
    )
    ratings = models.IntegerField(null=True, blank=True)
    is_anonymous = models.BooleanField(default=False)
    anonymous_user = models.ForeignKey(User, related_name='feedback_anonymous', on_delete=models.CASCADE, null=True)
    client = models.ForeignKey(User, related_name='feedback_client', on_delete=models.CASCADE, null=True)
    provider = models.ForeignKey(User, related_name='feedback_provider', on_delete=models.CASCADE)
    created_time = models.DateTimeField(auto_now_add=True)

class PaymentDetail(models.Model):
    client = models.ForeignKey(User, related_name='payment_transferred', on_delete=models.CASCADE)
    provider = models.ForeignKey(User, related_name='payment_received', on_delete=models.CASCADE)
    product_id = models.CharField(max_length=250, null=True)

    def __str__(self):
        return f"{self.client.email} -> {self.provider.email}"
    
    def create_price(self, price, price_id=None, recurring=None):
        return Price.objects.create(payment=self, price=price, price_id=price_id, recurring=True if recurring else False)

class Price(models.Model):
    payment = models.ForeignKey(PaymentDetail, related_name="prices", on_delete=models.CASCADE)
    price = models.FloatField(default=0.0)
    price_id = models.CharField(max_length=250, null=True)
    subscription_id = models.CharField(max_length=250, null=True)
    recurring = models.BooleanField(default=False)
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    success = models.BooleanField(default=True)
    cancelled = models.BooleanField(default=False)
    
class CheckList(models.Model):
    TYPE = [
        ('1', 'Preparing Families Postpartum and Beyond'),
        ('2', 'Lactation Support'),
        ('3', 'Mental Health Support'),
        ('4', 'Resource Hub'),
    ]

    image = models.ImageField(upload_to="check_list", null=True, blank=True)
    category = models.CharField(
        max_length=255,
        choices=TYPE,
        default='1'
    )
    text = models.TextField(
        null=True,
        blank=True,
    )

class Booking(models.Model):
    TYPE = [
        ('urgent', 'Urgent'),
        ('not_urgent', 'Not Urgent'),
    ]
    BOOKING_HELP = [
        ('mental_health', 'Mental Health'),
        ('lactation_support', 'Lactation Support'),
    ]
    flag = models.CharField(
        max_length=255,
        choices=TYPE,
        default='urgent'
    )
    appointment_help = models.CharField(
        max_length=255,
        choices=BOOKING_HELP,
        default='mental_health'
    )
    product_id = models.CharField(max_length=250, null=True)
    client = models.ForeignKey(User, related_name='client_booking', on_delete=models.CASCADE)
    provider = models.ForeignKey(User, related_name='provider_booking', on_delete=models.CASCADE)
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    booking_time = models.DateTimeField()
    zoom_link = models.TextField(
        null=True,
        blank=True,
    )
    

class Schedule(models.Model):
    
    provider = models.ForeignKey(User, related_name='provider_schedule', on_delete=models.CASCADE)
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField()
    is_available = models.BooleanField(default=True)
    notes = models.TextField(null=True, blank=True)

class Shifts(models.Model):

    # providers = models.ManyToManyField(
    #     to=User,
    #     related_name='provider_shifts',
    # )
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    start_time = models.TimeField(null=True, default=None)
    end_time = models.TimeField(null=True, default=None)
    notes = models.TextField(null=True, blank=True)

class Availability(models.Model):

    provider = models.ForeignKey(User, related_name='provider_availibility', on_delete=models.CASCADE)
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    shift = models.ForeignKey(Shifts, related_name='provider_shift', on_delete=models.CASCADE)
    start_time = models.TimeField(null=True, default=None)
    end_time = models.TimeField(null=True, default=None)
    monday = models.BooleanField(null=True, default=False)
    tuesday = models.BooleanField(null=True, default=False)
    wednesday = models.BooleanField(null=True, default=False)
    thursday = models.BooleanField(null=True, default=False)
    friday = models.BooleanField(null=True, default=False)
    saturday = models.BooleanField(null=True, default=False)
    sunday = models.BooleanField(null=True, default=False)
    is_available = models.BooleanField(default=False)
    notes = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)

