from django.db import models


class TelegramUser(models.Model):
    telegram_user_id = models.IntegerField()
    username = models.CharField(max_length=100)

    def __str__(self):
        return self.username


class Place(models.Model):
    name = models.CharField(max_length=20)
    telegram_user_id = models.ForeignKey(TelegramUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class User(models.Model):
    username = models.CharField(max_length=50)
    id_telegram = models.IntegerField(null=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.username


class Expense(models.Model):
    name = models.CharField(max_length=30)
    cost = models.FloatField()
    date = models.DateField()
    who_paid_user = models.ForeignKey(
        User, related_name="user_who_paid_expense", on_delete=models.CASCADE
    )
    place = models.ForeignKey(Place, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.name} - {self.cost} who_paid: {self.who_paid_user.username}"


class MoneyTransfer(models.Model):
    amount = models.FloatField()
    date = models.DateField()
    who_paid_user = models.ForeignKey(
        User, related_name="user_who_paid_money_transfer", on_delete=models.CASCADE
    )
    who_gets_user = models.ForeignKey(
        User, related_name="user_who_gets_money_transfer", on_delete=models.CASCADE
    )
    place = models.ForeignKey(Place, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return (
            f"who_paid:{self.who_paid_user.username}"
            f"who_gets:{self.who_gets_user.username} - amount:{self.amount}"
        )
