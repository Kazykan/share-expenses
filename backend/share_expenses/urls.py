"""
URL configuration for share_expenses project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from backend_api.views import (
    TelegramUserViewSet,
    PlaceViewSet,
    UserViewSet,
    ExpenseViewSet,
    MoneyTransferViewSet,
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"TelegramUser", TelegramUserViewSet)
router.register(r"Place", PlaceViewSet)
router.register(r"User", UserViewSet)
router.register(r"Expense", ExpenseViewSet)
router.register(r"MoneyTransfer", MoneyTransferViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
]
