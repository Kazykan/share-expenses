from pydantic import BaseModel, ConfigDict


class PlaceBase(BaseModel):
    web_app_user_id: int
    name: str


class PlaceCreate(PlaceBase):
    pass


class PlaceUpdate(PlaceCreate):
    pass


class PlaceUpdatePartial(PlaceCreate):
    web_app_user_id: int | None = None
    name: str | None = None


class Place(PlaceBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
