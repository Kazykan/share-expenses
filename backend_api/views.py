from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters

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


class PlaceView(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['telegram_user_id__id']


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['place__id']


class ExpenseView(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['place__id']



class MoneyTransferView(viewsets.ModelViewSet):
    queryset = MoneyTransfer.objects.all()
    serializer_class = MoneyTransferSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['place__id']



# class PlaceView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "name": output.name,
#                 "telegram_user_id": output.telegram_user_id
#             } for output in Place.objects.all()
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

#             } for output in User.objects.all()
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
#                 "place": output.place


#             } for output in Expense.objects.all()
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
#                 "place": output.place
#             } for output in MoneyTransfer.objects.all()
#         ]
#         return Response(output)

#     def post(self, request):
#         serializer = MoneyTransferSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
