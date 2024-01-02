from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import TelegramUser, User, Place, Expense, MoneyTransfer
from .serializer import (
    TelegramUserSerializer,
    UserSerializer,
    PlaceSerializer,
    ExpenseSerializer,
    MoneyTransferSerializer,
)


class TelegramUserViewSet(viewsets.ModelViewSet):
    queryset = TelegramUser.objects.all()
    serializer_class = TelegramUserSerializer
    filterset_fields = ("id_telegram_app",)


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    filterset_fields = ("name", "telegram_user")


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ("place",)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filterset_fields = (
        "place",
        "who_paid_user",
    )


class MoneyTransferViewSet(viewsets.ModelViewSet):
    queryset = MoneyTransfer.objects.all()
    serializer_class = MoneyTransferSerializer
    filterset_fields = ("place", "who_paid_user", "who_gets_user")
