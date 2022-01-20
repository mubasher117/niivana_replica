from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

from home.api.v1.viewsets import (
    BookingViewSet,
    ChecklistViewSet,
    FeedbackViewSet,
    PaymentViewSet,
    SignupViewSet,
    LoginViewSet,
    GoogleLogin,
    FacebookLogin,
    AppleLogin,
    CustomPasswordTokenVerificationView,
    UserViewSet,
    GetProviderViewSets,
    ProviderAvalabilityViewSet,
    ProviderShiftsViewSet,
    ResetOTPViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("login/apple", AppleLogin, basename="apple_login")
router.register("profile", UserViewSet, basename="profile")
router.register("feedback", FeedbackViewSet, basename="feedback")
router.register("payment", PaymentViewSet, basename="payment")
router.register("checklist", ChecklistViewSet, basename="checklist")
router.register("providers", GetProviderViewSets,basename='users')
router.register("availability", ProviderAvalabilityViewSet,basename='availability')
router.register("shifts", ProviderShiftsViewSet,basename='shifts')
router.register("otp", ResetOTPViewSet,basename='otp')

urlpatterns = [
    path("", include(router.urls)),
    re_path(r"^login/google/$", GoogleLogin.as_view(), name="google_login"),
    re_path(r"^login/facebook/$", FacebookLogin.as_view(), name="facebook_login"),
    url(
        r"^password-reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    path(
        "reset-password/verify-token/",
        CustomPasswordTokenVerificationView.as_view(),
        name="password_reset_verify_token",
    ),
]
