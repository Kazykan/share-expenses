from sqlalchemy.ext.asyncio import AsyncSession
from core.models import WebAppUser
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import WebAppUserCreate, WebAppUserUpdate, WebAppUserUpdatePartial


async def get_webAppUsers(session: AsyncSession) -> list[WebAppUser]:
    stmt = select(WebAppUser).order_by(WebAppUser.id)
    result: Result = await session.execute(stmt)
    products = result.scalars().all()
    return list(products)


async def get_webAppUser_by_tUser_id(
    session: AsyncSession,
    telegram_user_id: int,
) -> WebAppUser | None:
    """Ищем пользователя по полю telegram_user_id"""
    stmt = select(WebAppUser).where(WebAppUser.telegram_user_id == telegram_user_id)
    result: Result = await session.execute(stmt)
    webAppUser = result.scalar_one_or_none()
    return webAppUser


async def get_webAppUser(
    session: AsyncSession,
    web_app_user_id: int,
) -> WebAppUser | None:
    return await session.get(WebAppUser, web_app_user_id)


async def create_webAppUser(
    session: AsyncSession,
    webAppUser_in: WebAppUserCreate,
) -> WebAppUser:
    webAppUser = WebAppUser(**webAppUser_in.model_dump())
    session.add(webAppUser)
    await session.commit()
    return webAppUser


async def update_webAppUser(
    session: AsyncSession,
    webAppUser: WebAppUser,
    webAppUser_update: WebAppUserUpdate | WebAppUserUpdatePartial,
    partial: bool = False,
) -> WebAppUser:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in webAppUser_update.model_dump(exclude_unset=partial).items():
        setattr(webAppUser, name, value)
    await session.commit()
    return webAppUser


async def delete_webAppUser(
    session: AsyncSession,
    webAppUser: WebAppUser,
) -> None:
    await session.delete(webAppUser)
    await session.commit()
