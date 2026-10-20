import logging
from fastapi import APIRouter, Request, HTTPException, status
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.email_service import send_contact_email
from app.services.storage_service import log_contact_submission, update_submission_status
from app.core.security import rate_limiter, get_client_ip

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Contact"])


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_200_OK,
    summary="Submit Contact Message",
    description="Validate contact fields, store submission in local SQLite, and deliver to Gmail inbox via Gmail SMTP."
)
async def submit_contact_form(payload: ContactRequest, request: Request):
    """
    Handle contact form submissions:
    1. Enforce rate limiting per client IP.
    2. Check honeypot field for bot spam.
    3. Log submission in SQLite.
    4. Send email via Gmail SMTP with Google App Password.
    5. Update status and return standardized response.
    """
    client_ip = get_client_ip(request)

    # 1. Rate Limiting Check
    rate_limiter.check(client_ip)

    # 2. Honeypot Spam Prevention
    if payload.website:
        logger.warning(f"Honeypot triggered by IP {client_ip}. Silently rejecting.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request submission."
        )

    # 3. Log to SQLite (Pending state)
    submission_id = log_contact_submission(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        status="pending",
        ip_address=client_ip
    )

    # 4. Dispatch Email via Gmail SMTP
    try:
        send_contact_email(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
            ip_address=client_ip
        )
        update_submission_status(submission_id, "delivered")
        
        return ContactResponse(
            success=True,
            message="Your message has been sent successfully to Teshav Sharma."
        )

    except HTTPException as http_exc:
        update_submission_status(submission_id, "failed")
        raise http_exc

    except Exception as exc:
        update_submission_status(submission_id, "failed")
        logger.error(f"Unexpected error handling contact submission: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while delivering your message. Please reach out directly."
        )
