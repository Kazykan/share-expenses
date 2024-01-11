from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    MoneyTransfer,
    MoneyTransferCreate,
    MoneyTransferUpdate,
    MoneyTransferUpdatePartial,
)
from . import crud
from .dependencies import transfer_by_id
from core.models import db_helper

router = APIRouter(tags=["MoneyTransfers"])


@router.get("/", response_model=list[MoneyTransfer])
async def get_transfers(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    place_id: int | None = None,
    who_paid_member_id: int | None = None,
    who_got_member_id: int | None = None,
):
    if (
        place_id is not None
        or who_paid_member_id is not None
        or who_got_member_id is not None
    ):
        print(f"get_transaction_filter place_id: {place_id}")
        transfer = await crud.get_transfer_filters(
            session=session,
            place_id=place_id,
            who_got_member_id=who_got_member_id,
            who_paid_member_id=who_paid_member_id,
        )
        if transfer is not None:
            return transfer

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"WebAppUser {place_id} not found!",
        )
    else:
        return await crud.get_transfers(session=session)


# @router.get("/", response_model=list[MoneyTransfer])
# async def get_transfers(
#     session: AsyncSession = Depends(db_helper.scoped_session_dependency),
# ):
#     return await crud.get_transfers(session=session)


@router.post(
    "/",
    response_model=MoneyTransfer,
    status_code=status.HTTP_201_CREATED,
)
async def create_transfer(
    transfer_in: MoneyTransferCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_transfer(
        session=session,
        transfer_in=transfer_in,
    )


@router.get("/{place_id}/", response_model=MoneyTransfer)
async def get_transfer(
    place_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    transfer = await crud.get_transfer_filters(session=session, place_id=place_id)
    if transfer is not None:
        return transfer

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"WebAppUser {place_id} not found!",
    )


@router.put("/{transfer_id}/")
async def update_transfer(
    transfer_update: MoneyTransferUpdate,
    transfer: MoneyTransfer = Depends(transfer_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_transfer(
        session=session, transfer=transfer, transfer_update=transfer_update
    )


@router.patch("/{transfer_id}/")
async def update_transfer_partial(
    transfer_update: MoneyTransferUpdatePartial,
    transfer: MoneyTransfer = Depends(transfer_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_transfer(
        session=session,
        transfer=transfer,
        transfer_update=transfer_update,
        partial=True,
    )


@router.delete("/{transfer_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_transfer(
    transfer: MoneyTransfer = Depends(transfer_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_transfer(session=session, transfer=transfer)
