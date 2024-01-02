from pydantic import BaseModel, ConfigDict
import datetime


class ExpenseBase(BaseModel):
    cost: float
    name: str
    date: datetime.date
    place_id: int
    who_paid_member_id: int

class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(ExpenseCreate):
    pass


class ExpenseUpdatePartial(ExpenseCreate):
    cost: float | None = None
    name: str | None = None
    date: datetime.date | None = None
    place_id: int | None = None
    who_paid_member_id: int | None = None


class Expense(ExpenseBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
