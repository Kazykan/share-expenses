from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Expense
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import ExpenseCreate, ExpenseUpdate, ExpenseUpdatePartial


async def get_expenses(session: AsyncSession) -> list[Expense]:
    stmt = select(Expense).order_by(Expense.id)
    result: Result = await session.execute(stmt)
    products = result.scalars().all()
    return list(products)


async def get_expense_by_place_id(
    session: AsyncSession,
    place_id: int,
) -> Expense | None:
    """Ищем пользователя по полю place_id"""
    stmt = select(Expense).where(Expense.place_id == place_id)
    result: Result = await session.execute(stmt)
    products = result.scalar()
    return products


async def get_expense(
    session: AsyncSession,
    web_app_user_id: int,
) -> Expense | None:
    return await session.get(Expense, web_app_user_id)


async def create_expense(
    session: AsyncSession,
    expense_in: ExpenseCreate,
) -> Expense:
    expense = Expense(**expense_in.model_dump())
    session.add(expense)
    await session.commit()
    return expense


async def update_expense(
    session: AsyncSession,
    expense: Expense,
    expense_update: ExpenseUpdate | ExpenseUpdatePartial,
    partial: bool = False,
) -> Expense:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in expense_update.model_dump(exclude_unset=partial).items():
        setattr(expense, name, value)
    await session.commit()
    return expense


async def delete_expense(
    session: AsyncSession,
    expense: Expense,
) -> None:
    await session.delete(expense)
    await session.commit()
