from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
import uvicorn
from contextlib import asynccontextmanager
from core.models import Base, db_helper
from api_v1 import router as router_v1
from core.config import settings
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with db_helper.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield


app = FastAPI(
    title="Share expenses",
    lifespan=lifespan,
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "127.0.0.1:46532",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router=router_v1, prefix=settings.api_v1_prefix)


class CreateUser(BaseModel):
    email: EmailStr


@app.get("/")
def hello():
    return "Hello, world!"


@app.post("/users/")
def create_user(user: CreateUser):
    return {"messege": "success", "email": user.email}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
