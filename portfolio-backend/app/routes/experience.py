from fastapi import APIRouter
from app.data.portfolio_data import EXPERIENCE_DATA

router = APIRouter(tags=["Experience"])


@router.get(
    "/experience",
    summary="Get Experience & Internships",
    description="Retrieve professional internships, roles, and technical achievements."
)
async def get_experience():
    return {
        "success": True,
        "count": len(EXPERIENCE_DATA),
        "data": EXPERIENCE_DATA
    }
