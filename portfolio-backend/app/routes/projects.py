from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from app.data.portfolio_data import PROJECTS_DATA

router = APIRouter(tags=["Projects"])


@router.get(
    "/projects",
    summary="Get Portfolio Projects",
    description="Retrieve all showcase projects with filtering by category or featured status."
)
async def get_projects(
    category: Optional[str] = Query(None, description="Filter by category (e.g. 'Generative AI', 'Machine Learning')"),
    featured_only: Optional[bool] = Query(False, description="Filter to featured projects only")
):
    projects = PROJECTS_DATA

    if featured_only:
        projects = [p for p in projects if p.get("isFeatured", False)]

    if category:
        category_lower = category.lower()
        projects = [p for p in projects if p.get("category", "").lower() == category_lower]

    return {
        "success": True,
        "count": len(projects),
        "data": projects
    }


@router.get(
    "/projects/{project_id}",
    summary="Get Project Details",
    description="Retrieve full details for a specific project by unique ID."
)
async def get_project_by_id(project_id: str):
    project = next((p for p in PROJECTS_DATA if p.get("id") == project_id), None)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID '{project_id}' not found."
        )
    return {
        "success": True,
        "data": project
    }
