# Generated by Django 4.2.6 on 2023-10-20 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TelegramUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('telegram_user_id', models.IntegerField()),
                ('username', models.CharField(max_length=100)),
            ],
        ),
    ]
