from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

from booking.api.v1.viewsets import (
  AppointmentViewSet,
  ProviderPaymentViewSet
)

router = DefaultRouter()
router.register("appointment", AppointmentViewSet, basename="booking")
router.register("booking", ProviderPaymentViewSet, basename="booking")

urlpatterns = [
    path("", include(router.urls)),
]
