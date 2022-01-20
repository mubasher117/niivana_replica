

from home.api.v1.serializers import UserSerializer
from booking.api.v1.serializers import AppointmentSerializer, AppointmenPriceSerializer
from booking.models import Appointment,AppointmentPaymentDetail
from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import parsers, renderers, status

User = get_user_model()

from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY if settings.STRIPE_LIVE_MODE else settings.STRIPE_TEST_SECRET_KEY

class AppointmentViewSet(ModelViewSet):
    serializer_class = AppointmentSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )

    @action(detail=False, methods=['get'])
    def get_user_appointments(self, request):
        queryset = Appointment.objects.filter(client=request.user).order_by('-create_date_time')
        serializer = AppointmentSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_provider_appointments(self, request):
        queryset = Appointment.objects.filter(provider=request.user).order_by('-create_date_time')
        serializer = AppointmentSerializer(queryset, many=True)
        return Response(serializer.data)

class ProviderPaymentViewSet(ViewSet):
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

    @action(detail=False, methods=['post'])
    def pay_provider(self, request):
        if not request.user.stripe_customer_id:
            self.create_customer_id(request.user)
        
        recurring = request.data.get('recurring')
        amount = int(float(request.data['price'])) * 100
        provider_id = request.data['provider_id']
        booking_time = request.data['booking_time']
        booking_type = request.data['booking_type']
        booking_help = request.data['booking_help']
        provider = User.objects.get(id=provider_id)
        zoom_response = UserSerializer().create_meeting(request.user, provider, booking_time)
        booking_detail, created = booking_created = Appointment.objects.get_or_create(flag=booking_type, client=request.user, provider=provider, booking_time=booking_time,appointment_help=booking_help, zoom_link=zoom_response['start_url'],
                                                                                      meeting_id=zoom_response['id'], meeting_password=zoom_response['password'], meeting_join_url=zoom_response['join_url'])
        payment_detail, created = AppointmentPaymentDetail.objects.get_or_create(appointment=booking_detail)
        
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

        return Response({"appointment": AppointmenPriceSerializer(price_detail).data,
            "zoom_link" : zoom_response['start_url'],
            "meeting_id" : zoom_response['id'],
            "meeting_password": zoom_response['password'],
            "meeting_join_url": zoom_response['join_url']}
        )
