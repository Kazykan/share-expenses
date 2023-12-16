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


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    filterset_fields = ("name", "telegram_user_id")


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ("place",)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filterset_fields = ("place", "who_paid_user",)


class MoneyTransferViewSet(viewsets.ModelViewSet):
    queryset = MoneyTransfer.objects.all()
    serializer_class = MoneyTransferSerializer
    filterset_fields = ("place", "who_paid_user", "who_gets_user")


# class PlaceView(APIView):
#     def get(self, request):
#         output = [
#             {"name": output.name, "telegram_user_id": output.telegram_user_id}
#             for output in Place.objects.all()
#         ]
#         return Response(output)

#     def post(self, request):
#         serializer = PlaceSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


# class UserView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "username": output.username,
#                 "id_telegram": output.id_telegram,
#                 "place": output.place,
#             }
#             for output in User.objects.all()
#         ]
#         return Response(output)

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


# class ExpenseView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "name": output.name,
#                 "cost": output.cost,
#                 "date": output.date,
#                 "who_paid_user": output.who_paid_user,
#                 "place": output.place,
#             }
#             for output in Expense.objects.all()
#         ]
#         return Response(output)

#     def post(self, request):
#         serializer = ExpenseSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


# class MoneyTransferView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "amount": output.amount,
#                 "date": output.date,
#                 "who_paid_user": output.who_paid_user,
#                 "who_gets_user": output.who_gets_user,
#                 "place": output.place,
#             }
#             for output in MoneyTransfer.objects.all()
#         ]
#         return Response(output)

#     def post(self, request):
#         serializer = MoneyTransferSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
