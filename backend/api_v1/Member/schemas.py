from pydantic import BaseModel, ConfigDict


class MemberBase(BaseModel):
    id_telegram: int | None = None
    username: str
    place_id: int


class MemberCreate(MemberBase):
    pass


class MemberUpdate(MemberCreate):
    pass


class MemberUpdatePartial(MemberCreate):
    id_telegram: int | None = None
    username: str | None = None
    place_id: int | None = None


class Member(MemberBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
