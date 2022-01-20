from users.models import Booking, CheckList, Feedback, PaymentDetail, Price, Availability, Schedule, Shifts
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token
from django.conf import settings

from .user_utils import UserUtils
from datetime import datetime, timedelta
from time import mktime
import requests
import json
import jwt
import random
import string

User = get_user_model()

class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        # To support inserts with the value
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)

class SignupSerializer(serializers.ModelSerializer):

    group = serializers.CharField(required=True, write_only=True)

    def get_user_type(self, obj):
        obj.group

    class Meta:
        model = User
        fields = ("id", "name", "email", "password","age","last_name","group","location","refferal_code","hear_about_us")

        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
            "last_name": {
                "required": True,
            },
            "location": {
                "required": True,
            },
            "age": {
                "required": True,
            },
            "refferal_code": {
                "required": False,
            },
            "hear_about_us": {
                "required": True,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        group = validated_data.get("group")
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
            age=validated_data.get("age"),
            location=validated_data.get("location"),
            last_name=validated_data.get("last_name"),
            hear_about_us=validated_data.get("hear_about_us"),
            refferal_code=validated_data.get("refferal_code"),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        created_groud, created = Group.objects.get_or_create(name=group)
        user.groups.add(created_groud)
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name",)

class ChecklistSerializer(serializers.ModelSerializer):
    category = ChoiceField(choices=CheckList.TYPE)

    class Meta:
        model = CheckList
        fields = "__all__"

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ["id", "email", "name", "profile_picture", "groups", "age", "location", "last_name","stripe_customer_id",
                  'reset_code', 'reset_expiry', 'zoom_id', 'about', 'price', 'specialization', 'is_available']

    def register_zoom(self, user):
        user = user
        if user.zoom_id:
            return
        dt = datetime.now()
        future = dt + timedelta(seconds=6000)
        expiration = int(mktime(future.timetuple()))
        token_expiration = expiration

        encode = jwt.encode(
            {"iss": settings.ZOOM_API_KEY, "exp": token_expiration},
            settings.ZOOM_API_SECRET,
            algorithm="HS256",
            headers={"typ": "JWT"},
        )
        jwt_token = encode

        url = "https://api.zoom.us/v2/users/"

        payload = json.dumps({
            "action": "custCreate",
            "user_info": {
                "email": user.email,
                "type": 2,
                "first_name": user.name.split()[0] if user.name and len(user.name.split()) > 0 else '',
                "last_name": user.name.split()[1] if user.name and len(user.name.split()) > 1 else ''
            }
        })
        headers = {
            'Authorization': 'Bearer {}'.format(jwt_token),
            'Content-Type': 'application/json',
            'Cookie': 'cred=33ADF4B97583D7F17B647FBC646716AC'
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        if response.status_code == 200 or response.status_code == 201:
            User.objects.filter(id=user.id).update(zoom_id=json.loads(response.text)['id'])
            return json.loads(response.text)['id']

        else:
            url = "https://api.zoom.us/v2/users/"+user.email
            response = requests.request("GET", url, headers=headers, data=payload)
            User.objects.filter(id=user.id).update(zoom_id=json.loads(response.text)['id'])

    def get_random_string(self, length):
        # choose from all lowercase letter
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(length))
        return result_str
    def create_meeting(self, user, provider, booking_time):

        dt = datetime.now()
        future = dt + timedelta(seconds=6000)
        expiration = int(mktime(future.timetuple()))
        token_expiration = expiration

        encode = jwt.encode(
            {"iss": settings.ZOOM_API_KEY, "exp": token_expiration},
            settings.ZOOM_API_SECRET,
            algorithm="HS256",
            headers={"typ": "JWT"},
        )
        jwt_token = encode
        zoom_id = user.zoom_id
        provider_zoom_id = provider.zoom_id
        if not zoom_id:
            zoom_id = self.register_zoom(user)
        if not provider_zoom_id:
            provider_zoom_id = self.register_zoom(provider)
        url = "https://api.zoom.us/v2/users/{}/meetings".format(provider_zoom_id)

        payload = json.dumps({
            # "created_at": "2021-12-20T16:47:50Z",
            "duration": 60,
            # "host_id": provider_zoom_id,
            # "id": provider.id,
            "password": self.get_random_string(8),
            "type": 1,
            "timezone": "America/New_York",
            "topic": "Booking",
            # "join_url": "https://zoom.us/j/"+str(provider.id),
        })
        headers = {
            'Authorization': 'Bearer '+jwt_token,
            'Content-Type': 'application/json',
            'Cookie': '_zm_csp_script_nonce=ZLX63faoT0ipZmTXXyiRgQ; _zm_currency=USD; _zm_mtk_guid=2d9f1ccf28af41bb9465ac17871bdb05; cred=EF1385F3E8F772684D8B61CB21980A87'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        url = "https://api.zoom.us/v2/meetings/99691553844/registrants"

        payload = json.dumps({
            "email": user.email,
             "first_name": user.name.split()[0] if user.name and len(user.name.split()) > 0 else '',
            "last_name": user.name.split()[1] if user.name and len(user.name.split()) > 1 else '',
            "address": "",
            "city": "",
            "country": "",
            "zip": "",
            "state": "",
            "phone": "",
            "industry": "Tech",
            "org": "IT",
            "job_title": "DA",
            "purchasing_time_frame": "",
            "role_in_purchase_process": ""
        })

        response1 = requests.request("POST", url, headers=headers, data=payload)
        return(json.loads(response.text))

class PaymentDetailSerializer(serializers.ModelSerializer):
    # prices = serializers.SerializerMethodField()
    client = UserSerializer()
    provider = UserSerializer()
    
    class Meta:
        model = PaymentDetail
        fields = "__all__"

    def get_prices(self, payment):
        recurring = self.context.get('recurring')
        return PriceSerializer(payment.prices.all().filter(success=True, recurring=recurring).order_by("-create_date_time"), many=True).data


class PriceSerializer(serializers.ModelSerializer):
    payment = PaymentDetailSerializer()
    class Meta:
        model = Price
        fields = "__all__"

class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm

class CustomTokenSerializer(serializers.Serializer):
    token = serializers.CharField()

class SocialSerializer(serializers.Serializer):
    access_token = serializers.CharField()

    def social_login(self, user_info, social_platform):
        social_id = user_info.pop("id")
        request = self.context.get("request")
        profile = UserUtils.get_profle_meta_details(
            request.META,
            social_id=str(social_id),
            social_platform=social_platform,
            user_info=user_info,
        )
        update_data = {"is_active": True, "profile": profile}
        if "name" in user_info and user_info["name"]:
            update_data.update({"name": user_info["name"]})
        try:
            user = User.objects.get(username__iexact=user_info["email"])
            try:
                if user.profile.profile_image.file:
                    del update_data["profile"]["profile_image"]
            except:
                pass
        except User.DoesNotExist:
            user_dict = UserUtils.get_user_social_dict(user_info)
            user = UserSerializer().create(user_dict)
            token = Token.objects.create(user=user)
        except KeyError:
            raise serializers.ValidationError("Email not found")
        user = UserSerializer().update(instance=user, validated_data=update_data)

        return user


class ProviderAvailabilitySerializer(serializers.ModelSerializer):
    provider = UserSerializer()

    class Meta:
        model = Availability
        fields = "__all__"

class ProviderShiftsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shifts
        fields = "__all__"

class FeedbackSerializer(serializers.ModelSerializer):
    # client = UserSerializer()
    class Meta:
        model = Feedback
        # fields = "__all__"
        exclude = ['anonymous_user']