from app.routes.health import router as health_router
from app.routes.contact import router as contact_router
from app.routes.projects import router as projects_router
from app.routes.skills import router as skills_router
from app.routes.experience import router as experience_router
from app.routes.education import router as education_router

__all__ = [
    "health_router",
    "contact_router",
    "projects_router",
    "skills_router",
    "experience_router",
    "education_router"
]
