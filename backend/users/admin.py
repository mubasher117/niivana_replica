from django.contrib import admin
from .models import User
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm

from .models import PaymentDetail, Price, CheckList, Booking, Availability, Shifts, Feedback

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (
        ("User", {"fields": ("name", "age", "location", 'stripe_customer_id', 'reset_code', 'reset_expiry', 'about',
                             'price', 'specialization', 'profile_picture', 'is_available')}),
    ) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser"]
    search_fields = ["name"]

admin.site.register(CheckList)
admin.site.register(Booking)
admin.site.register(Availability)
admin.site.register(Shifts)
admin.site.register(Feedback)

class PriceAdmin(admin.TabularInline):
    model = Price

@admin.register(PaymentDetail)
class PaymentAdmin(admin.ModelAdmin):
    inlines = [PriceAdmin]
