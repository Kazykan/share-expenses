from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Expense
from . import crud


async def expense_by_id(
    expense_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Expense:
    """Делаем это как зависимость"""
    expense = await crud.get_expense(
        session=session, web_app_user_id=expense_id
    )
    if expense is not None:
        return expense

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Expense {expense_id} not found!",
    )
