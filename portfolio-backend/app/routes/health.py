from datetime import datetime, timezone
from fastapi import APIRouter
from app.core.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health", summary="Health Check")
async def health_check():
    """
    Check API operational status, version, and SMTP readiness.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "smtp_configured": settings.is_smtp_configured,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
