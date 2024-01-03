from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Expense,
    ExpenseCreate,
    ExpenseUpdate,
    ExpenseUpdatePartial,
)
from . import crud
from .dependencies import expense_by_id
from core.models import db_helper

router = APIRouter(tags=["Expenses"])


@router.get("/", response_model=list[Expense])
async def get_expenses(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    place_id: int | None = None,
    who_paid_member_id: int | None = None,
):
    if place_id is not None or who_paid_member_id is not None:
        expense = await crud.get_expense_by_place_id(
            session=session,
            place_id=place_id,
            who_paid_member_id=who_paid_member_id,
        )
        if expense is not None:
            return expense

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Place {place_id} not found!",
        )
    else:
        return await crud.get_expenses(session=session)


@router.post(
    "/",
    response_model=Expense,
    status_code=status.HTTP_201_CREATED,
)
async def create_expense(
    expense_in: ExpenseCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_expense(
        session=session,
        expense_in=expense_in,
    )


# @router.get("/{place_id}/", response_model=Expense)
# async def get_expense_by_place_id(
#     place_id: int,
#     session: AsyncSession = Depends(db_helper.session_dependency),
# ):
#     expense = await crud.get_expense_by_place_id(
#         session=session, place_id=place_id
#     )
#     if expense is not None:
#         return expense

#     raise HTTPException(
#         status_code=status.HTTP_404_NOT_FOUND,
#         detail=f"Place {place_id} not found!",
#     )


@router.put("/{expense_id}/")
async def update_expense(
    expense_update: ExpenseUpdate,
    expense: Expense = Depends(expense_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_expense(
        session=session, expense=expense, expense_update=expense_update
    )


@router.patch("/{expense_id}/")
async def update_expense_partial(
    expense_update: ExpenseUpdatePartial,
    expense: Expense = Depends(expense_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_expense(
        session=session,
        expense=expense,
        expense_update=expense_update,
        partial=True,
    )


@router.delete("/{expense_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense: Expense = Depends(expense_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_expense(session=session, expense=expense)
