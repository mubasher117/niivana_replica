from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Appointment(models.Model):
    APPOINTMENT_TYPES = [
        ('urgent', 'Urgent'),
        ('not_urgent', 'Not Urgent'),
    ]
    APPOINTMENT_HELP_TYPE = [
        ('mental_health', 'Mental Health'),
        ('lactation_support', 'Lactation Support'),
    ]
    flag = models.CharField(
        max_length=255,
        choices=APPOINTMENT_TYPES,
        default='urgent'
    )
    appointment_help = models.CharField(
        max_length=255,
        choices=APPOINTMENT_HELP_TYPE,
        default='mental_health'
    )
    client = models.ForeignKey(User, related_name='client_appoinment', on_delete=models.CASCADE)
    provider = models.ForeignKey(User, related_name='provider_appoinment', on_delete=models.CASCADE)
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    booking_time = models.DateTimeField()
    zoom_link = models.TextField(
        null=True,
        blank=True,
    )
    meeting_id = models.BigIntegerField(null=True, default=None)
    meeting_password = models.CharField(max_length=255, null=True, default=None)
    meeting_join_url = models.TextField(max_length=255, null=True, default=None)

class AppointmentPaymentDetail(models.Model):
    appointment = models.ForeignKey(Appointment, related_name='appointment_detail', on_delete=models.CASCADE)
    product_id = models.CharField(max_length=250, null=True)

    def __str__(self):
        return f"{self.appointment.client.email} -> {self.appointment.provider.email}"
    
    def create_price(self, price, price_id=None, recurring=None):
        return AppointmentPrice.objects.create(payment=self, price=price, price_id=price_id, recurring=True if recurring else False)

class AppointmentPrice(models.Model):
    payment = models.ForeignKey(AppointmentPaymentDetail, related_name="prices", on_delete=models.CASCADE)
    price = models.FloatField(default=0.0)
    price_id = models.CharField(max_length=250, null=True)
    subscription_id = models.CharField(max_length=250, null=True)
    recurring = models.BooleanField(default=False)
    create_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True)
    success = models.BooleanField(default=True)
    cancelled = models.BooleanField(default=False)