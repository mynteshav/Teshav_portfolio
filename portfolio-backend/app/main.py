import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.services.storage_service import init_db
from app.routes import (
    health_router,
    contact_router,
    projects_router,
    skills_router,
    experience_router,
    education_router
)

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("portfolio-backend")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifecycle management:
    - Runs startup tasks (initialize SQLite schema, verify environment)
    - Yields control to handle incoming requests
    - Runs shutdown cleanup
    """
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION} [{settings.ENVIRONMENT}]")
    init_db()
    if not settings.is_smtp_configured:
        logger.warning(
            "SMTP credentials not detected in environment (.env). "
            "Contact form will reject live dispatches until SMTP_EMAIL & SMTP_APP_PASSWORD are provided."
        )
    else:
        logger.info(f"Gmail SMTP configured for sender: {settings.SMTP_EMAIL}")
    yield
    logger.info("Portfolio backend is shutting down.")


# Initialize FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Production-ready FastAPI backend for Teshav Sharma's portfolio. "
        "Provides contact form handling via Gmail SMTP, rate limiting, and structured endpoints "
        "for projects, technical skills, experience, and education."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["Retry-After"]
)


# Custom Validation Exception Handler for consistent error messages
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for err in exc.errors():
        field_loc = " -> ".join(str(loc) for loc in err.get("loc", []))
        errors.append({
            "field": field_loc,
            "message": err.get("msg")
        })
    logger.warning(f"Validation error for {request.url.path}: {errors}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "detail": "Validation error: please verify your input.",
            "errors": errors
        }
    )


# Register API Routers
app.include_router(health_router, prefix=settings.API_PREFIX)
app.include_router(contact_router, prefix=settings.API_PREFIX)
app.include_router(projects_router, prefix=settings.API_PREFIX)
app.include_router(skills_router, prefix=settings.API_PREFIX)
app.include_router(experience_router, prefix=settings.API_PREFIX)
app.include_router(education_router, prefix=settings.API_PREFIX)


@app.get("/", tags=["Root"], summary="Root Endpoint")
async def root():
    """
    Root entry point directing visitors to API documentation.
    """
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "redoc_url": "/redoc",
        "health_check": f"{settings.API_PREFIX}/health"
    }
