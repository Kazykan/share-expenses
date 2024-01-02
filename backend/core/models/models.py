import datetime
from .base import Base
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy import Date, ForeignKey, String
from typing import List


class WebAppUser(Base):
    __tablename__ = "web_app_user"

    id: Mapped[int] = mapped_column(primary_key=True)
    telegram_user_id: Mapped[int]
    username: Mapped[str]
    places: Mapped[List["Place"]] = relationship()


class Place(Base):
    """Название поездки или места мероприятия где нужно разделить расходы"""

    __tablename__ = "place"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(20))
    web_app_user_id: Mapped[int] = mapped_column(ForeignKey("web_app_user.id"))
    members: Mapped[List["Member"]] = relationship()
    expenses: Mapped[List["Expense"]] = relationship()


class Member(Base):
    """Участники мероприятия"""

    __tablename__ = "member"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    id_telegram: Mapped[int] = mapped_column(nullable=True)
    place_id: Mapped[int] = mapped_column(ForeignKey("place.id"))
    expenses: Mapped[List["Expense"]] = relationship()
    # paid_money_transfer: Mapped[List["MoneyTransfer"]] = relationship(
    #     back_populates="member_paid",
    # )
    # got_money_transfer: Mapped[List["MoneyTransfer"]] = relationship(
    #     back_populates="member_got",
    # )
    # paid_money_expenses: Mapped[List["Expense"]] = relationship(
    #     back_populates="member_paid",
    # )


class MoneyTransfer(Base):
    """Переводы денег между участниками"""

    __tablename__ = "money_transfer"

    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[float]
    date: Mapped[datetime.date] = mapped_column(Date)
    place_id: Mapped[int] = mapped_column(ForeignKey("place.id"))

    who_paid_member_id: Mapped[int] = mapped_column(ForeignKey("member.id"))
    who_paid_member: Mapped["Member"] = relationship(foreign_keys=[who_paid_member_id])
    # member_paid: Mapped["Member"] = relationship(back_populates="paid_money_transfer")

    who_got_member_id: Mapped[int] = mapped_column(ForeignKey("member.id"))
    who_got_member: Mapped["Member"] = relationship(foreign_keys=[who_got_member_id])
    # member_got: Mapped["Member"] = relationship(back_populates="got_money_transfer")


class Expense(Base):
    """Траты участников, название траты, кто заплатил за все, когда, столько"""

    __tablename__ = "expense"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    cost: Mapped[float]
    date: Mapped[datetime.date] = mapped_column(Date)
    place_id: Mapped[int] = mapped_column(ForeignKey("place.id"))
    who_paid_member_id: Mapped[int] = mapped_column(ForeignKey("member.id"))
    # member_paid: Mapped["Member"] = relationship(back_populates="paid_money_expenses")
