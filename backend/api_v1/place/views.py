from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Place,
    PlaceCreate,
    PlaceUpdate,
    PlaceUpdatePartial,
)
from . import crud
from .dependencies import place_by_id
from core.models import db_helper

router = APIRouter(tags=["Places"])


@router.get("/", response_model=list[Place])
async def get_places(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_places(session=session)


@router.post(
    "/",
    response_model=Place,
    status_code=status.HTTP_201_CREATED,
)
async def create_place(
    place_in: PlaceCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    # TODO: проверка есть ли такой пользователь web_app_user_id
    return await crud.create_place(
        session=session,
        place_in=place_in,
    )


@router.get("/{web_app_user_id}/", response_model=list[Place])
async def get_place(
    web_app_user_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    places = await crud.get_place_by_web_app_user_id(
        session=session, web_app_user_id=web_app_user_id
    )
    if places is not None:
        return places

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"WebAppUser {web_app_user_id} not found!",
    )


@router.put("/{web_app_user_id}/")
async def update_place(
    place_update: PlaceUpdate,
    place: Place = Depends(place_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_place(
        session=session, place=place, place_update=place_update
    )


@router.patch("/{web_app_user_id}/")
async def update_place_partial(
    place_update: PlaceUpdatePartial,
    place: Place = Depends(place_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_place(
        session=session,
        place=place,
        place_update=place_update,
        partial=True,
    )


@router.delete("/{web_app_user_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_place(
    place: Place = Depends(place_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_place(session=session, place=place)
