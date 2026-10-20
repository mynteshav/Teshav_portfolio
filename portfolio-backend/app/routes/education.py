from fastapi import APIRouter
from app.data.portfolio_data import EDUCATION_DATA

router = APIRouter(tags=["Education"])


@router.get(
    "/education",
    summary="Get Education History",
    description="Retrieve academic degrees, institutions, and coursework highlights."
)
async def get_education():
    return {
        "success": True,
        "count": len(EDUCATION_DATA),
        "data": EDUCATION_DATA
    }
