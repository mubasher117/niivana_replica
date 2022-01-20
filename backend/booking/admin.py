from django.contrib import admin

from booking.models import Appointment, AppointmentPaymentDetail, AppointmentPrice

# Register your models here.

admin.site.register(Appointment)
admin.site.register(AppointmentPrice)

class PriceAdmin(admin.TabularInline):
    model = AppointmentPrice

@admin.register(AppointmentPaymentDetail)
class PaymentAdmin(admin.ModelAdmin):
    inlines = [PriceAdmin]
