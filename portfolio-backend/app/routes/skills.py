from typing import Optional
from fastapi import APIRouter
from app.data.portfolio_data import SKILLS_DATA

router = APIRouter(tags=["Skills"])


@router.get(
    "/skills",
    summary="Get Technical Skills",
    description="Retrieve categorized technical skills including Generative AI, Machine Learning, Deep Learning, and Analytics."
)
async def get_skills(category_id: Optional[str] = None):
    skills = SKILLS_DATA
    if category_id:
        skills = [c for c in skills if c.get("id") == category_id]
        
    return {
        "success": True,
        "count": len(skills),
        "data": skills
    }
