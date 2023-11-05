from rest_framework import serializers

from .models import TelegramUser, Place, MoneyTransfer, User, Expense


class TelegramUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramUser
        # fields = ['telegram_user_id', 'username', 'id']
        fields = "__all__"


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"


class MoneyTransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoneyTransfer
        fields = "__all__"
