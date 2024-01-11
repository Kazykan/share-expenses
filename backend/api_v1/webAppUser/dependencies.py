from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, WebAppUser
from . import crud

async def webAppUser_by_id(
    web_app_user_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> WebAppUser:
    """Делаем это как зависимость"""
    webAppUser = await crud.get_webAppUser(
        session=session, web_app_user_id=web_app_user_id
    )
    if webAppUser is not None:
        return webAppUser

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"WebAppUser {web_app_user_id} not found!",
    )
