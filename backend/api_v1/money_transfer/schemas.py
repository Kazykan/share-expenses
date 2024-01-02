from pydantic import BaseModel, ConfigDict
import datetime


class MoneyTransferBase(BaseModel):
    amount: float
    date: datetime.date
    place_id: int
    who_paid_member_id: int
    who_got_member_id: int


class MoneyTransferCreate(MoneyTransferBase):
    pass


class MoneyTransferUpdate(MoneyTransferCreate):
    pass


class MoneyTransferUpdatePartial(MoneyTransferCreate):
    amount: float | None = None
    date: datetime.date | None = None
    place_id: int | None = None
    who_paid_member_id: int | None = None
    who_got_member_id: int | None = None


class MoneyTransfer(MoneyTransferBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
