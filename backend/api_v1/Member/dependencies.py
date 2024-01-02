from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Member
from . import crud

async def member_by_id(
    member_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Member:
    """Делаем это как зависимость"""
    member = await crud.get_member(
        session=session, member_id=member_id
    )
    if member is not None:
        return member

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Member {member_id} not found!",
    )
