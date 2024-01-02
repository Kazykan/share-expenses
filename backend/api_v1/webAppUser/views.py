from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    WebAppUser,
    WebAppUserCreate,
    WebAppUserUpdate,
    WebAppUserUpdatePartial,
)
from . import crud
from .dependencies import webAppUser_by_id
from core.models import db_helper

router = APIRouter(tags=["WebAppUsers"])


@router.get("/", response_model=WebAppUser | list[WebAppUser])
async def get_webAppUsers(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    telegram_user_id: int | None = None,
):
    if telegram_user_id is not None:
        webAppUser = await crud.get_webAppUser_by_tUser_id(
            session=session, telegram_user_id=telegram_user_id
        )
        if webAppUser is not None:
            return webAppUser

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"WebAppUser {telegram_user_id} not found!",
        )
    else:
        return await crud.get_webAppUsers(session=session)


@router.post(
    "/",
    response_model=WebAppUser,
    status_code=status.HTTP_201_CREATED,
)
async def create_webAppUser(
    webAppUser_in: WebAppUserCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_webAppUser(
        session=session,
        webAppUser_in=webAppUser_in,
    )


# @router.get("/{telegram_user_id}/", response_model=WebAppUser)
# async def get_webAppUser(
#     telegram_user_id: int,
#     session: AsyncSession = Depends(db_helper.session_dependency),
# ):
#     webAppUser = await crud.get_webAppUser_by_tUser_id(
#         session=session, telegram_user_id=telegram_user_id
#     )
#     if webAppUser is not None:
#         return webAppUser

#     raise HTTPException(
#         status_code=status.HTTP_404_NOT_FOUND,
#         detail=f"WebAppUser {telegram_user_id} not found!",
#     )


@router.put("/{web_app_user_id}/")
async def update_webAppUser(
    webAppUser_update: WebAppUserUpdate,
    webAppUser: WebAppUser = Depends(webAppUser_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_webAppUser(
        session=session, webAppUser=webAppUser, webAppUser_update=webAppUser_update
    )


@router.patch("/{web_app_user_id}/")
async def update_webAppUser_partial(
    webAppUser_update: WebAppUserUpdatePartial,
    webAppUser: WebAppUser = Depends(webAppUser_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_webAppUser(
        session=session,
        webAppUser=webAppUser,
        webAppUser_update=webAppUser_update,
        partial=True,
    )


@router.delete("/{web_app_user_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_webAppUser(
    webAppUser: WebAppUser = Depends(webAppUser_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_webAppUser(session=session, webAppUser=webAppUser)
