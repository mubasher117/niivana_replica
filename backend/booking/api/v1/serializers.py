from booking.models import Appointment, AppointmentPrice, AppointmentPaymentDetail
from home.api.v1.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import Group
from rest_framework import serializers

User = get_user_model()

class AppointmentSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    class Meta:
        model = Appointment
        fields = "__all__"

class AppointmenPriceSerializer(serializers.ModelSerializer):
    payment = AppointmentPaymentDetail()
    class Meta:
        model = AppointmentPrice
        fields = "__all__"