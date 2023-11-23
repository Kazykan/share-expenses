from django.contrib import admin
from .models import TelegramUser, User, Place, Expense, MoneyTransfer

admin.site.register(TelegramUser)
admin.site.register(User)
admin.site.register(Place)
admin.site.register(Expense)
admin.site.register(MoneyTransfer)
