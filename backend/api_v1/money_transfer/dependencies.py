from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, WebAppUser
from . import crud


async def transfer_by_id(
    transfer_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> WebAppUser:
    """Делаем это ка зависимость"""
    transfer = await crud.get_transfer(session=session, transfer_id=transfer_id)
    if transfer is not None:
        return transfer

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"WebAppUser {transfer_id} not found!",
    )
