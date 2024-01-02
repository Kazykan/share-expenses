from sqlalchemy.ext.asyncio import AsyncSession
from core.models import MoneyTransfer
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import (
    MoneyTransferCreate,
    MoneyTransferUpdate,
    MoneyTransferUpdatePartial,
)


# async def get_transfers(session: AsyncSession, transfer_filter: TransferFilter) -> list[MoneyTransfer]:
#     query_filter = transfer_filter.filter(select(MoneyTransfer))
#     # stmt = select(MoneyTransfer).order_by(MoneyTransfer.id)
#     result: Result = await session.execute(query_filter)
#     transfers = result.scalars().all()
#     return list(transfers)


async def get_transfers(session: AsyncSession) -> list[MoneyTransfer]:
    stmt = select(MoneyTransfer).order_by(MoneyTransfer.id)
    result: Result = await session.execute(stmt)
    products = result.scalars().all()
    return list(products)


async def get_transfer_filters(
    session: AsyncSession,
    place_id: int | None,
    who_paid_member_id: int | None,
    who_got_member_id: int | None,
) -> MoneyTransfer | None:
    """Функция запускается когда есть хотя бы один из фильтров"""
    stmt = select(MoneyTransfer)
    if place_id is not None:
        stmt = stmt.where(MoneyTransfer.place_id == place_id)
    if who_got_member_id is not None:
        stmt = stmt.where(MoneyTransfer.who_got_member_id == who_got_member_id)
    if who_paid_member_id is not None:
        stmt = stmt.where(MoneyTransfer.who_paid_member_id == who_paid_member_id)
    result: Result = await session.execute(stmt)
    transfers = result.scalars().all()
    return transfers


async def get_transfer(
    session: AsyncSession,
    transfer_id: int,
) -> MoneyTransfer | None:
    return await session.get(MoneyTransfer, transfer_id)


async def create_transfer(
    session: AsyncSession,
    transfer_in: MoneyTransferCreate,
) -> MoneyTransfer:
    transfer = MoneyTransfer(**transfer_in.model_dump())
    session.add(transfer)
    await session.commit()
    return transfer


async def update_transfer(
    session: AsyncSession,
    transfer: MoneyTransfer,
    transfer_update: MoneyTransferUpdate | MoneyTransferUpdatePartial,
    partial: bool = False,
) -> MoneyTransfer:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in transfer_update.model_dump(exclude_unset=partial).items():
        setattr(transfer, name, value)
    await session.commit()
    return transfer


async def delete_transfer(
    session: AsyncSession,
    transfer: MoneyTransfer,
) -> None:
    await session.delete(transfer)
    await session.commit()
