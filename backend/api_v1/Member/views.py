from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Member,
    MemberCreate,
    MemberUpdate,
    MemberUpdatePartial,
)
from . import crud
from .dependencies import member_by_id
from core.models import db_helper

router = APIRouter(tags=["Members"])


@router.get("/", response_model=list[Member])
async def get_members(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_members(session=session)


@router.post(
    "/",
    response_model=Member,
    status_code=status.HTTP_201_CREATED,
)
async def create_member(
    member_in: MemberCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_member(
        session=session,
        member_in=member_in,
    )


@router.get("/{place_id}/", response_model=list[Member])
async def get_member(
    place_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    member = await crud.get_member_by_place_id(
        session=session, place_id=place_id
    )
    if member is not None:
        return member

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Member {place_id} not found!",
    )


@router.put("/{place_id}/")
async def update_member(
    member_update: MemberUpdate,
    member: Member = Depends(member_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_member(
        session=session, member=member, member_update=member_update
    )


@router.patch("/{member_by_id}/")
async def update_member_partial(
    member_update: MemberUpdatePartial,
    member: Member = Depends(member_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_member(
        session=session,
        member=member,
        member_update=member_update,
        partial=True,
    )


@router.delete("/{place_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_member(
    member: Member = Depends(member_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_member(session=session, member=member)
