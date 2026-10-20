import os
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables and .env file.
    """
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    # Core Application Settings
    PROJECT_NAME: str = "Teshav Sharma Portfolio API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    API_PREFIX: str = "/api"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS Settings
    # Supports either a list or comma-separated string in environment variables
    ALLOWED_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:4173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:4173",
        "http://127.0.0.1:3000"
    ]

    # Gmail SMTP Configuration
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_EMAIL: str = ""
    SMTP_APP_PASSWORD: str = ""
    CONTACT_RECEIVER_EMAIL: str = "teshavsharma74@gmail.com"

    # Security & Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 5
    SQLITE_DB_PATH: str = "contact_submissions.db"

    @property
    def cors_origins(self) -> List[str]:
        """Normalize ALLOWED_ORIGINS to a list of strings."""
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return self.ALLOWED_ORIGINS

    @property
    def is_smtp_configured(self) -> bool:
        """Check if SMTP credentials are provided."""
        return bool(self.SMTP_EMAIL and self.SMTP_APP_PASSWORD)

    @property
    def receiver_email(self) -> str:
        """Resolve receiver email address with fallback."""
        return self.CONTACT_RECEIVER_EMAIL or self.SMTP_EMAIL or "teshavsharma74@gmail.com"


settings = Settings()
