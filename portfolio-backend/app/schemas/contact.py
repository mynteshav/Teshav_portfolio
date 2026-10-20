from typing import Optional
from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr, Field, field_validator
from app.core.security import sanitize_header_value


class ContactRequest(BaseModel):
    """
    Schema for contact form submission requests.
    Enforces length limits, field sanitization, and anti-injection rules.
    """
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full name of the sender",
        examples=["Sarah Jenkins"]
    )
    email: EmailStr = Field(
        ...,
        max_length=254,
        description="Valid email address for replies",
        examples=["sarah.jenkins@example.com"]
    )
    subject: str = Field(
        ...,
        min_length=3,
        max_length=150,
        description="Subject of the message",
        examples=["Inquiry regarding AI/ML Engineering Collaboration"]
    )
    message: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="Detailed message content",
        examples=["Hi Teshav, I reviewed your AI Career Intelligence project and would love to discuss an internship opportunity."]
    )
    # Honeypot spam trap: human users will not see or fill this in
    website: Optional[str] = Field(
        default=None,
        description="Anti-spam honeypot field; must remain empty",
        examples=[None]
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        clean = v.strip()
        if len(clean) < 2:
            raise ValueError("Name must contain at least 2 non-whitespace characters.")
        return sanitize_header_value(clean)

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v: str) -> str:
        clean = v.strip()
        if len(clean) < 3:
            raise ValueError("Subject must contain at least 3 non-whitespace characters.")
        return sanitize_header_value(clean)

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        clean = v.strip()
        if len(clean) < 10:
            raise ValueError("Message must contain at least 10 non-whitespace characters.")
        return clean


class ContactResponse(BaseModel):
    """
    Schema for standardized contact form response.
    """
    success: bool
    message: str
    timestamp: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
