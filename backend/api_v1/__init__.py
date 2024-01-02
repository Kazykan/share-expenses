from fastapi import APIRouter

from .webAppUser.views import router as webAppUsers_router
from .Member.views import router as members_router
from .place.views import router as places_router
from .money_transfer.views import router as money_transfer
from .expense.views import router as expense_router

router = APIRouter()

router.include_router(router=webAppUsers_router, prefix="/webAppUsers")
router.include_router(router=members_router, prefix="/members")
router.include_router(router=places_router, prefix="/places")
router.include_router(router=money_transfer, prefix="/money_transfers")
router.include_router(router=expense_router, prefix="/expense_routers")
