from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, WebAppUser
from . import crud


async def place_by_id(
    place_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> WebAppUser:
    """Делаем это ка зависимость"""
    place = await crud.get_place(session=session, place_id=place_id)
    if place is not None:
        return place

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"WebAppUser {place_id} not found!",
    )
