from users.models import Booking, CheckList, Feedback, PaymentDetail, Price, Availability, Shifts
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework import parsers, renderers, status
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.views import get_password_reset_token_expiry_time
from django.utils import timezone
from datetime import timedelta
import random

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView
from rest_framework import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY if settings.STRIPE_LIVE_MODE else settings.STRIPE_TEST_SECRET_KEY

User = get_user_model()

from .serializers import BookingSerializer, ChecklistSerializer, CustomTokenSerializer, FeedbackSerializer, PriceSerializer, ProviderAvailabilitySerializer, ProviderShiftsSerializer
from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    SocialSerializer
)
import jwt
import json 
from .user_utils import UserUtils

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})

@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        "current_user": reset_password_token.user,
        "username": reset_password_token.user.username,
        "email": reset_password_token.user.email,
        "reset_password_url": "{}?token={}".format(
            reverse("password_reset:reset-password-request"), reset_password_token.key
        ),
        "token": reset_password_token.key,
    }
    context["reset_password_url"] = (
        "https://emerald-bio-27652.botics.co/reset-password/" + reset_password_token.key
    )
    # render email text
    email_html_message = render_to_string("email/user_reset_password.html", context)
    email_plaintext_message = render_to_string("email/user_reset_password.txt", context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="IwantSmart"),
        # message:
        email_plaintext_message,
        # from:
        "shabeebhasan@hotmail.com",
        # to:
        [reset_password_token.user.email],
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "https://developers.google.com/oauthplayground"


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client

class CustomPasswordTokenVerificationView(APIView):
    """
    An Api View which provides a method to verifiy that a given pw-reset token is valid before actually confirming the
    reset.
    """

    throttle_classes = ()
    permission_classes = ()
    parser_classes = (
        parsers.FormParser,
        parsers.MultiPartParser,
        parsers.JSONParser,
    )
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = CustomTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]

        # get token validation time
        password_reset_token_validation_time = get_password_reset_token_expiry_time()

        # find token
        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

        if reset_password_token is None:
            return Response({"status": "invalid"}, status=status.HTTP_404_NOT_FOUND)

        # check expiry date
        expiry_date = reset_password_token.created_at + timedelta(
            hours=password_reset_token_validation_time
        )

        if timezone.now() > expiry_date:
            # delete expired token
            reset_password_token.delete()
            return Response({"status": "expired"}, status=status.HTTP_404_NOT_FOUND)

        # check if user has password to change
        if not reset_password_token.user.has_usable_password():
            return Response({"status": "irrelevant"})

        return Response({"status": "OK"})

class AppleLogin(viewsets.ViewSet):
    serializer_class = SocialSerializer

    def create(self, request):
        social_serializer = SocialSerializer(data=request.data)
        social_serializer.is_valid(raise_exception=True)
        res_status = UserUtils.verify_apple_details(request.data["access_token"])
        if res_status.status_code != 200:
            return Response({
                'success': False,
                'result': "Invalid Token!",
            }, status=status.HTTP_400_BAD_REQUEST)
        user_info = res_status.json()
        id_token = user_info.get('id_token', None) #request.data["id_token"]
        response_data = {}
        if id_token:
            decoded = jwt.decode(id_token, '', verify=False)
            response_data.update({'email': decoded['email'] if 'email' in decoded else None})
            response_data.update({'id': decoded['sub']}) if 'sub' in decoded else None
            response_data.update({'name': request.data['name'] if 'name' in request.data else None})
        user = SocialSerializer(context={"request": request}). \
            social_login(response_data, "Apple")
        
        return Response({
            'success': True,
            'result': UserSerializer(user).data,
            'type': 'apple',
            'token': Token.objects.get(user=user).key
        }, status=status.HTTP_200_OK)

class FeedbackViewSet(ViewSet):
    serializer_class = FeedbackSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    def get_object(self, pk):

        try:
            return Feedback.objects.get(pk=pk)
        except Feedback.DoesNotExist:
            raise serializers.ValidationError({
                'success': 'false',
                'error': 'Provider Feedback does not exist'
            })
    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST':
            return FeedbackSerializer
        return FeedbackSerializer

    def delete(self, request, pk, format=None):
        obj = self.get_object(pk)
        obj.delete()
        return Response({
            'success': True,
            'result': "successfully deleted!"},
            status=HTTP_200_OK
        )
    def get_queryset(self):
        return Feedback.objects.filter(user=self.request.user)

    def create(self, request):

        subject = request.data.get('subject')
        ratings = int(request.data['ratings'])
        provider_id = request.data['provider_id']
        message = request.data['message']
        is_anonymous = bool(request.data['is_anonymous'])
        # provider = User.objects.get(id=provider_id)
        # user = User.objects.get(id=request.user.id)
        user_id = request.user.id
        client = user_id if not is_anonymous else None
        anonymous_user = user_id if is_anonymous else None
        fetched_data = {"subject": subject,
                        "ratings": ratings,
                        "provider": provider_id,
                        "message": message,
                        "is_anonymous": is_anonymous,
                        "client": client,
                        "anonymous_user" : anonymous_user
                        }
        serializer_feedback = FeedbackSerializer(data=fetched_data)
        serializer_feedback.is_valid(raise_exception=True)
        serializer_feedback.save()

        return Response({
            "success": True,
            "response": serializer_feedback.data
        })

    def list(self, request):
        queryset = Feedback.objects.filter(provider=request.GET.get('id'))
        serializer = FeedbackSerializer(queryset, many=True)

        return Response({
            "success": True,
            "response": serializer.data
        })


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    queryset = Booking.objects.all()

class ChecklistViewSet(viewsets.ModelViewSet):
    serializer_class = ChecklistSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    queryset = CheckList.objects.all()

class GetProviderViewSets(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  def get_queryset(self): 
    queryset = User.objects.filter(groups__name__in=['Provider'])
    return queryset

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.GET.get('query')
        users = User.objects.filter(Q(first_name__icontains=query) | Q(last_name__icontains=query) | Q(email__icontains=query))
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def get_user_profile(self, request):
        UserSerializer().register_zoom(request.user)
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(methods=['post'], detail=False)
    def set_profile_picture(self, request, pk=None):
        image = request.data['image']
        request.user.profile_picture = image
        request.user.save()
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class PaymentViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = (
        authentication.TokenAuthentication,
    )

    @action(detail=False, methods=['get'])
    def get_customer_id(self, request):
        if not request.user.stripe_customer_id:
            customer = stripe.Customer.create(
                description="Customer for {}".format(request.user.email),
                email=request.user.email
            )
            request.user.stripe_customer_id = customer.id
            request.user.save()
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_cards(self, request):
        if not request.user.stripe_customer_id:
            self.create_customer_id(request.user)

        if request.user.stripe_customer_id:
            cards = stripe.Customer.list_sources(
                request.user.stripe_customer_id,
                object="card",
            )
            return Response(cards)
        return Response("User not a customer", status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def get_stripe_account(self, request):
        if not request.user.stripe_customer_id:
            return Response({'error': "No account linked for this user"}, status=status.HTTP_404_NOT_FOUND)
        return Response(stripe.Account.retrieve(request.user.stripe_customer_id))

    @action(detail=False, methods=['post'])
    def create_source(self, request):
        if not request.user.stripe_customer_id:
            self.create_customer_id(request.user)

        if request.user.stripe_customer_id:
            try:
                card = stripe.Customer.create_source(
                        request.user.stripe_customer_id,
                        source=request.data['token'],
                        )
            except Exception as e:
                return Response(str(e))
            return Response(card)
        return Response("User not a customer", status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def delete_source(self, request):
        if request.user.stripe_customer_id:
            response = stripe.Customer.delete_source(
                  request.user.stripe_customer_id,
                  request.data['id']
                )
            return Response(response)
        return Response("User not a customer", status=status.HTTP_400_BAD_REQUEST)

    def get_product(self, product_id):
        return stripe.Product.retrieve(product_id)

    @action(detail=False, methods=['get'])
    def get_products(self, request):
        return Response(stripe.Product.list())

    @action(detail=False, methods=['get'])
    def get_plans(self, request):
        return Response(stripe.Plan.list())

    def get_subscription(self, customer_id):
        return stripe.Subscription.list(customer= customer_id, limit=1)

    def create_customer_id(self, user):
        customer = stripe.Customer.create(
            description="Customer for {}".format(user.email),
            email=user.email
        )
        user.stripe_customer_id = customer.id
        user.save()

    @action(detail=False, methods=['get'])
    def get_subs(self, request):
        if not request.user.stripe_customer_id:
            self.create_customer_id(request.user)
        return Response(self.get_subscription(request.user.stripe_customer_id))
    
    @action(detail=False, methods=['get'])
    def get_sub(self, request):
        id = request.GET.get('id')
        return Response(stripe.Subscription.retrieve(id))
    
    @action(detail=False, methods=['get'])
    def get_plan(self, request):
        id = request.GET.get('id')
        return Response(stripe.Plan.retrieve(id))
    
    @action(detail=False, methods=['get'])
    def get_product(self, request):
        id = request.GET.get('id')
        return Response(stripe.Product.retrieve(id))

    @action(detail=False, methods=['get'])
    def get_payment_details_provider(self, request):
        provider_id = request.data['provider_id']
        recurring = request.GET.get('recurring')
        provider = User.objects.get(id=provider_id)
        detail = Price.objects.get(payment__client=request.user, payment__provider=provider, recurring=recurring).order_by("-create_date_time")
        return Response(PriceSerializer(detail).data)
    
    @action(detail=False, methods=['get'])
    def get_payment_details(self, request):
        recurring = request.GET.get('recurring')
        details = Price.objects.filter(payment__client=request.user, recurring=recurring).order_by("-create_date_time")
        return Response(PriceSerializer(details, many=True, context={'recurring': recurring}).data)
    
    @action(detail=False, methods=['get'])
    def get_provider_payment_details(self, request):
        recurring = request.GET.get('recurring')
        details = Price.objects.filter(payment__provider=request.user, recurring=recurring).order_by("-create_date_time")
        return Response(PriceSerializer(details, many=True).data)

    @action(detail=False, methods=['get'])
    def get_provider_payment_details_client(self, request):
        client_id = request.data['client_id']
        client = User.objects.get(id=client_id)
        recurring = request.GET.get('recurring')
        detail = Price.objects.get(payment__provider=request.user, payment__client=client, recurring=recurring).order_by("-create_date_time")
        return Response(PriceSerializer(detail, context={'recurring': recurring}).data)

    @action(detail=False, methods=['get'])
    def get_invoices(self, request):
        subscription_id = request.GET['subscription_id']
        return Response(stripe.Invoice.list(subscription=subscription_id))

    @action(detail=False, methods=['post'])
    def create_subscription(self, request):
        if not request.user.stripe_customer_id:
            self.create_customer_id(request.user)
        
        recurring = request.data.get('recurring')
        amount = int(float(request.data['price'])) * 100
        provider_id = request.data['provider_id']
        provider = User.objects.get(id=provider_id)

        if not provider.stripe_customer_id:
            return Response({"error": "No stripe account attached with the provider"}, status=status.HTTP_400_BAD_REQUEST)

        payment_detail, created = PaymentDetail.objects.get_or_create(client=request.user, provider=provider)
        if created:
            product = stripe.Product.create(name=str(payment_detail))
            payment_detail.product_id = product.id
            payment_detail.save()

        price = stripe.Price.create(
                        unit_amount=amount,
                        currency="usd",
                        recurring={"interval": "month"},
                        product=payment_detail.product_id,
                    )
        price_detail = payment_detail.create_price(amount, price.id, recurring)

        try:
            if recurring:
                payment = stripe.Subscription.create(
                                                customer=request.user.stripe_customer_id,
                                                items=[
                                                    {"price": price.id},
                                                ],
                                                expand=["latest_invoice.payment_intent"],
                                                transfer_data={
                                                    "destination": provider.stripe_customer_id,
                                                },
                                            )
            else:
                payment = stripe.Charge.create(
                    amount=amount,
                    currency='usd',
                    customer=request.user.stripe_customer_id,
                    transfer_data={
                        "destination": provider.stripe_customer_id,
                    },
                )
            price_detail.subscription_id = payment.id
            price_detail.save()
        except Exception as e:
            price_detail.success = False
            price_detail.save()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        return Response(PriceSerializer(price_detail).data)
    
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        if not request.user.stripe_customer_id:
            self.create_customer_id(request.user)
        
        recurring = request.data.get('recurring')
        amount = int(float(request.data['price'])) * 100
        provider_id = request.data['provider_id']
        booking_time = request.data['booking_time']
        booking_type = request.data['booking_type']
        booking_help = request.data['booking_help']
        provider = User.objects.get(id=provider_id)

        payment_detail, created = PaymentDetail.objects.get_or_create(client=request.user, provider=provider)
        booking_detail, created = booking_created = Booking.objects.get_or_create(flag=booking_type, client=request.user, provider=provider, booking_time=booking_time,appointment_help=booking_help)
        
        if created:
            product = stripe.Product.create(name=str(payment_detail))
            payment_detail.product_id = product.id
            payment_detail.save()
            if booking_created:
              booking_detail.product_id = product.id
              booking_detail.save()
        

        price = stripe.Price.create(
                        unit_amount=amount,
                        currency="usd",
                        recurring={"interval": "month"},
                        product=payment_detail.product_id,
                    )
        price_detail = payment_detail.create_price(amount, price.id, recurring)

        try:
            if recurring:
                payment = stripe.Subscription.create(
                                                customer=request.user.stripe_customer_id,
                                                items=[
                                                    {"price": price.id},
                                                ],
                                                expand=["latest_invoice.payment_intent"]
                                            )
            else:
                payment = stripe.Charge.create(
                    amount=amount,
                    currency='usd',
                    customer=request.user.stripe_customer_id
                )
            price_detail.subscription_id = payment.id
            price_detail.save()

        except Exception as e:
            price_detail.success = False
            price_detail.save()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        return Response(PriceSerializer(price_detail).data)

    @action(detail=False, methods=['post'])
    def create_payment_details(self, request):
        recurring = request.data.get('recurring')
        amount = request.data['price']
        provider_id = request.data['provider_id']
        transaction_id = request.data.get('transaction_id')
        success = request.data.get('success')
        provider = User.objects.get(id=provider_id)
        payment_detail, created = PaymentDetail.objects.get_or_create(client=request.user, provider=provider)
        price_detail = payment_detail.create_price(amount)
        price_detail.recurring = True if recurring else False
        price_detail.success = True if success else False
        price_detail.subscription_id = transaction_id
        price_detail.save()
        return Response(PriceSerializer(price_detail).data)
    
    @action(detail=False, methods=['post'])
    def cancel_subscription(self, request):
        id = request.data['id']
        try:
            stripe.Subscription.delete(id)
            price_detail = Price.objects.filter(subscription_id=id).first()
            if price_detail:
                price_detail.cancelled = True
                price_detail.save()
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        return Response("Subscription canceled")
    
    @action(detail=False, methods=['post'])
    def create_stripe_account(self, request):
        try:
            account = stripe.Account.create(
                    type="express",
                    email=request.user.email,
                    requested_capabilities=['card_payments', 'transfers'],
                )
            request.user.stripe_customer_id = account.id
            request.user.save()
            link = stripe.AccountLink.create(
                        account=account.id,
                        refresh_url=f"{settings.WEBSITE_URL}/api/v1/payment/user_failed",
                        return_url=f"{settings.WEBSITE_URL}/api/v1/payment/user_created",
                        type="account_onboarding",
                    )
        except Exception as e:
            return Response(str(e))
        return Response(link)
    
    @action(detail=False, methods=['post'])
    def gen_auth_link(self, request):
        link = stripe.AccountLink.create(
                account=request.user.stripe_customer_id,
                refresh_url=f"{settings.WEBSITE_URL}/api/v1/payment/user_failed",
                return_url=f"{settings.WEBSITE_URL}/api/v1/payment/user_created",
                type="account_onboarding",
            )
        return Response(link)

    @action(detail=False, methods=['get'])
    def user_created(self, request):
        return Response("Account created")
    
    @action(detail=False, methods=['get'])
    def user_failed(self, request):
        return Response("Account creation failed")

    @action(detail=False, methods=['post'])
    def delete_account(self, request):
        stripe.Account.delete(request.user.stripe_customer_id)
        request.user.stripe_customer_id = ""
        request.user.save()
        return Response("Account deleted")

    @action(detail=False, methods=['post'])
    def create_login_link(self, request):
        try:
            link = stripe.Account.create_login_link(
                request.user.stripe_customer_id,
                redirect_url=f"{settings.WEBSITE_URL}/api/v1/payment/user_created"
            )
        except Exception as e:
            return Response(str(e))
        return Response(link)

    @action(detail=False, methods=['get'])
    def hooks(self, request):
        pass


class ProviderAvalabilityViewSet(ViewSet):
    serializer_class = ProviderAvailabilitySerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):

        try:
            return Availability.objects.get(pk=pk)
        except Availability.DoesNotExist:
            raise serializers.ValidationError({
                'success': 'false',
                'error': 'Provider Availability does not exist'
            })
    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST':
            return ProviderAvailabilitySerializer
        return ProviderAvailabilitySerializer

    def delete(self, request, pk, format=None):
        obj = self.get_object(pk)
        obj.delete()
        return Response({
            'success': True,
            'result': "successfully deleted!"},
            status=HTTP_200_OK
        )
    def get_queryset(self):
        return Availability.objects.filter(user=self.request.user)

    def create(self, request):
        request_data = request.data.copy()
        user = request.user.id

        fetched_data = {**request.data}
        shifts = fetched_data.get('shifts')
        shifts = json.dumps(shifts)
        shifts = json.loads(shifts)

        for shift in shifts:
            date = shift.get('date')
            start_time = shift.get('start_time')
            end_time = shift.get('end_time')

        request_shifts = {"date": date, "start_time": start_time, "end_time": end_time,'provider': user}
        serializer_provider_availability = ProviderAvailabilitySerializer(data=request_shifts)
        serializer_provider_availability.is_valid(raise_exception=True)
        serializer_provider_availability.save()

        return Response({
            "success": True,
            "response": serializer_provider_availability.data
        })

    def list(self, request):
        queryset = Availability.objects.filter(provider=request.user.id)
        serializer = ProviderAvailabilitySerializer(queryset, many=True)

        return Response({
            "success": True,
            "response": serializer.data
        })

    @action(detail=False, methods=['get'])
    def get_providers(self, request):
        queryset = Availability.objects.filter(is_active=True)
        serializer = ProviderAvailabilitySerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_provider(self, request):

        queryset = Availability.objects.filter(provider=request.GET.get('id'), is_active=True)
        serializer = ProviderAvailabilitySerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_providers(self, request):
        queryset = Availability.objects.filter(is_active=True)
        serializer = ProviderAvailabilitySerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def update_status(self, request):
        is_available = request.data.get('status')
        queryset = User.objects.filter(id=request.user.id).update(is_available=is_available)
        return Response({'status': True})

class ProviderShiftsViewSet(ViewSet):
    serializer_class = ProviderShiftsSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):

        try:
            return Shifts.objects.get(pk=pk)
        except Shifts.DoesNotExist:
            raise serializers.ValidationError({
                'success': 'false',
                'error': 'Provider Shifts does not exist'
            })
    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST':
            return ProviderShiftsSerializer
        return ProviderShiftsSerializer


    def get_queryset(self):
        return Shifts.objects.filter(user=self.request.user)

   
    def list(self, request):
        # print(request.user.id)
        # queryset = Shifts.objects.filter(providers__in=request.user)
        queryset = Shifts.objects.all()
        serializer = ProviderShiftsSerializer(queryset, many=True)

        queryset_availability = Availability.objects.filter(provider=request.user.id)
        serializer_availability = ProviderAvailabilitySerializer(queryset_availability, many=True)

        return Response({
            "success": True,
            "shifts": serializer.data,
            "availability": serializer_availability.data
        })

class ResetOTPViewSet(ModelViewSet):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (
    #     authentication.TokenAuthentication,
    # )
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def send_otp(self, request):
    # def list(self, request, *args, **kwargs):
        otp = random.randint(1000, 9999)
        email = request.data['email']
        # send an e-mail to the user
        context = {
          "email": email,
          "otp": otp
        }
        # render email text
        email_html_message = render_to_string("email/user_reset_code.html", context)
        email_plaintext_message = render_to_string("email/user_reset_code.txt", context)

        msg = EmailMultiAlternatives(
          # title:
          "Password Reset Code",
          # message:
          email_plaintext_message,
          # from:
          "shabeebhasan@hotmail.com",
          # to:
          [email],
        )
        msg.attach_alternative(email_html_message, "text/html")

        # now = datetime.datetime.now()
        expiry_date = timezone.now() + timedelta(
            minutes=5
        )

        user = User.objects.filter(email=email)
        user = user[0] if user else None
        if user:
            User.objects.filter(email=email).update(reset_code=otp, reset_expiry=expiry_date)
            msg.send()
            return Response({
                "success": True,
            })

        return Response({
            "success": False,
        })

    @action(detail=False, methods=['post'])
    def check_otp(self, request):
        # send an e-mail to the user
        code = request.data['code']
        email = request.data['email']

        user = User.objects.filter(email=email, reset_code=code)
        success = True
        error = None
        user = user[0] if user else None
        if not user:
            error = "Invalid Code"
            success = False
        elif user.reset_expiry < timezone.now():
            error = "Code Expired"
            success = False
        return Response({
            "success": success,
            "error": error
        })


    @action(detail=False, methods=['post'])
    def update_password(self, request):
        # send an e-mail to the user
        code = request.data['code']
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email, reset_code=code)
        success = True
        error = None
        user = user[0] if user else None
        if not user:
            error = "Invalid Code"
            success = False
        elif user.reset_expiry < timezone.now():
            error = "Code Expired"
            success = False
        user.set_password(password)
        user.save()
        return Response({
            "success": success,
            "error": error
        })
