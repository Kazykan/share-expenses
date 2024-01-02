from pydantic import BaseModel, ConfigDict

# from api_v1.place.schemas import Place


class WebAppUserBase(BaseModel):
    telegram_user_id: int
    username: str


class WebAppUserCreate(WebAppUserBase):
    pass


class WebAppUserUpdate(WebAppUserCreate):
    pass


class WebAppUserUpdatePartial(WebAppUserCreate):
    telegram_user_id: int | None = None
    username: str | None = None


class WebAppUser(WebAppUserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    # places: list[Place] | None
