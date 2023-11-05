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
from django.urls import re_path as url
from rest_framework import routers
from backend_api.views import (
    TelegramUserViewSet,
    PlaceView,
    UserView,
    ExpenseView,
    MoneyTransferView,
)

router = routers.DefaultRouter()
router.register(r"TelegramUser", TelegramUserViewSet)
router.register(r"PlaceView", PlaceView)
router.register(r"UserView", UserView)
router.register(r"ExpenseView", ExpenseView)
router.register(r"MoneyTransferView", MoneyTransferView)


urlpatterns = [
    path("admin/", admin.site.urls),
    # http://127.0.0.1:8000/api/v1/TelegramUser
    path("api/v1/", include(router.urls)),
]
