from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Member
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import MemberCreate, MemberUpdate, MemberUpdatePartial


async def get_members(session: AsyncSession) -> list[Member]:
    stmt = select(Member).order_by(Member.id)
    result: Result = await session.execute(stmt)
    products = result.scalars().all()
    return list(products)


async def get_member_by_place_id(
    session: AsyncSession,
    place_id: int,
) -> list[Member] | None:
    """Ищем участников относящихся к одному мероприятию"""
    stmt = select(Member).where(Member.place_id == place_id)
    result: Result = await session.execute(stmt)
    members = result.scalars().all()
    return list(members)


async def get_member(
    session: AsyncSession,
    member_id: int,
) -> Member | None:
    return await session.get(Member, member_id)


async def create_member(
    session: AsyncSession,
    member_in: MemberCreate,
) -> Member:
    member = Member(**member_in.model_dump())
    session.add(member)
    await session.commit()
    return member


async def update_member(
    session: AsyncSession,
    member: Member,
    member_update: MemberUpdate | MemberUpdatePartial,
    partial: bool = False,
) -> Member:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in member_update.model_dump(exclude_unset=partial).items():
        setattr(member, name, value)
    await session.commit()
    return member


async def delete_member(
    session: AsyncSession,
    member: Member,
) -> None:
    await session.delete(member)
    await session.commit()
