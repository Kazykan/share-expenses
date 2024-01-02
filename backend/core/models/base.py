from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr


class Base(DeclarativeBase):
    pass
    # __abstract__ = True

    # @declared_attr
    # # Создание у наследованных таблиц __tablename__ от имени класса в нижнем регистре
    # def __tablename__(cls) -> str:
    #     return f"{cls.__name__.lower()}s"

    # id: Mapped[int] = mapped_column(primary_key=True)
