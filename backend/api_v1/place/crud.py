from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Place
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import PlaceCreate, PlaceUpdate, PlaceUpdatePartial


async def get_places(session: AsyncSession) -> list[Place]:
    stmt = select(Place).order_by(Place.id)
    result: Result = await session.execute(stmt)
    places = result.scalars().all()
    return list(places)


async def get_place_by_web_app_user_id(
    session: AsyncSession,
    web_app_user_id: int,
) -> list[Place] | None:
    """Ищем пользователя по полю telegram_user_id"""
    stmt = select(Place).where(Place.web_app_user_id == web_app_user_id)
    result: Result = await session.execute(stmt)
    places = result.scalars().all()
    return list(places)


async def get_place(
    session: AsyncSession,
    place_id: int,
) -> Place | None:
    return await session.get(Place, place_id)


async def create_place(
    session: AsyncSession,
    place_in: PlaceCreate,
) -> Place:
    place = Place(**place_in.model_dump())
    session.add(place)
    await session.commit()
    return place


async def update_place(
    session: AsyncSession,
    place: Place,
    place_update: PlaceUpdate | PlaceUpdatePartial,
    partial: bool = False,
) -> Place:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in place_update.model_dump(exclude_unset=partial).items():
        setattr(place, name, value)
    await session.commit()
    return place


async def delete_place(
    session: AsyncSession,
    place: Place,
) -> None:
    await session.delete(place)
    await session.commit()
