import smtplib
import socket
import logging
import html
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timezone
from fastapi import HTTPException, status
from app.core.config import settings

logger = logging.getLogger(__name__)


def generate_html_template(
    name: str,
    email: str,
    subject: str,
    message: str,
    timestamp: str,
    ip_address: str = "Not captured"
) -> str:
    """
    Generate a professional responsive HTML email template for contact messages.
    """
    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_subject = html.escape(subject)
    safe_message = html.escape(message).replace("\n", "<br>")
    safe_timestamp = html.escape(timestamp)
    safe_ip = html.escape(ip_address)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0f19; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #3b82f6 100%); padding: 32px 30px; text-align: left;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #ccfbf1; margin-bottom: 8px;">
                Portfolio Inquiry Notification
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                New Message Received
              </h1>
              <p style="margin: 6px 0 0; font-size: 14px; color: #e0f2fe;">
                Sent via Teshav Sharma's Portfolio Contact API
              </p>
            </td>
          </tr>

          <!-- Sender Details Card -->
          <tr>
            <td style="padding: 28px 30px 10px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Sender</div>
                    <div style="font-size: 16px; font-weight: 700; color: #f8fafc;">{safe_name}</div>
                    <div style="font-size: 14px; color: #38bdf8; margin-top: 2px;">
                      <a href="mailto:{safe_email}" style="color: #38bdf8; text-decoration: none;">{safe_email}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; border-top: 1px solid #334155; font-size: 13px; color: #cbd5e1;">
                    <strong style="color: #94a3b8;">Subject:</strong> {safe_subject}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 20px 14px; border-top: 1px solid #334155; font-size: 12px; color: #64748b;">
                    <span>Date: {safe_timestamp}</span> &bull; <span>IP: {safe_ip}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 15px 30px 25px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 8px;">
                Message Content
              </div>
              <div style="background-color: #0f172a; border-left: 4px solid #14b8a6; border-radius: 4px 8px 8px 4px; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #f1f5f9; white-space: normal;">
                {safe_message}
              </div>
            </td>
          </tr>

          <!-- Quick Action Button -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #14b8a6 0%, #2563eb 100%);">
                    <a href="mailto:{safe_email}?subject=Re:%20{safe_subject}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px;">
                      Reply Directly to {safe_name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #0b0f19; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #64748b;">
              This notification was generated automatically by your portfolio FastAPI backend.
              <br>The visitor's email address is set as the <code>Reply-To</code> target.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def generate_plain_template(
    name: str,
    email: str,
    subject: str,
    message: str,
    timestamp: str,
    ip_address: str = "Not captured"
) -> str:
    """
    Plain-text fallback representation of the contact message.
    """
    return f"""======================================================
NEW PORTFOLIO CONTACT MESSAGE
Teshav Sharma Portfolio | FastAPI Backend
======================================================

Sender:    {name}
Email:     {email}
Subject:   {subject}
Date:      {timestamp}
Sender IP: {ip_address}

------------------------------------------------------
MESSAGE:
------------------------------------------------------
{message}

------------------------------------------------------
Reply directly to this email to respond to {name} ({email}).
======================================================
"""


import os
import httpx


def send_via_resend(
    name: str,
    email: str,
    subject: str,
    html_content: str,
    plain_content: str
) -> bool:
    """
    Send email via Resend REST API over HTTPS (Port 443).
    Bypasses cloud firewall SMTP port blocking (e.g. Render free tier).
    """
    try:
        logger.info(f"Connecting to Resend HTTPS API for recipient: {settings.receiver_email}...")
        from_email = os.getenv("RESEND_FROM_EMAIL", "Portfolio Contact <onboarding@resend.dev>")

        response = httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY.strip()}",
                "Content-Type": "application/json"
            },
            json={
                "from": from_email,
                "to": [settings.receiver_email],
                "reply_to": f"{name} <{email}>",
                "subject": f"[Portfolio Contact] {subject}",
                "html": html_content,
                "text": plain_content
            },
            timeout=15.0
        )

        if response.status_code in (200, 201):
            logger.info(f"Successfully dispatched contact email via Resend to '{settings.receiver_email}'")
            return True

        logger.error(f"Resend API returned status {response.status_code}: {response.text}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Email provider returned an error while dispatching your message. Please reach out directly."
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Failed to deliver email via Resend API: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to reach email service over HTTPS. Please reach out directly."
        )


def send_via_smtp(
    name: str,
    email: str,
    subject: str,
    html_content: str,
    plain_content: str
) -> bool:
    """
    Send contact form submission using Gmail SMTP (Port 587).
    """
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio Contact] {subject}"
    msg["From"] = f"{settings.PROJECT_NAME} <{settings.SMTP_EMAIL.strip()}>"
    msg["To"] = settings.receiver_email
    msg["Reply-To"] = f"{name} <{email}>"

    msg.attach(MIMEText(plain_content, "plain", "utf-8"))
    msg.attach(MIMEText(html_content, "html", "utf-8"))

    clean_email = settings.SMTP_EMAIL.strip()
    clean_password = settings.SMTP_APP_PASSWORD.replace(" ", "").strip()

    try:
        logger.info(f"Connecting to SMTP host {settings.SMTP_HOST}:{settings.SMTP_PORT}...")
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(clean_email, clean_password)
            server.send_message(msg)
            logger.info(f"Successfully dispatched contact email from '{email}' to '{settings.receiver_email}'")
        return True

    except smtplib.SMTPAuthenticationError as exc:
        logger.error(f"Gmail SMTP authentication failed: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to authenticate with Gmail SMTP. Check your Google App Password (ensure no spaces) or reach out directly."
        )

    except (smtplib.SMTPConnectError, socket.timeout, TimeoutError, OSError) as exc:
        logger.error(f"SMTP connection network failure: {exc}")
        # Note: Render free tier blocks outbound ports 25, 465, and 587
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="SMTP connection timed out. (Render free tier blocks SMTP ports 25, 465, 587; set RESEND_API_KEY in Render environment variables for free HTTPS delivery, or email directly)."
        )

    except smtplib.SMTPException as exc:
        logger.error(f"SMTP protocol error while sending contact email: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="An error occurred during email transmission. Please reach out directly."
        )

    except Exception as exc:
        logger.error(f"Unexpected error in email delivery: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process your message due to an internal server error. Please try again later."
        )


def send_contact_email(
    name: str,
    email: str,
    subject: str,
    message: str,
    ip_address: str = "127.0.0.1"
) -> bool:
    """
    Send contact form submission.
    Prefers Resend API via HTTPS (Port 443) which works seamlessly on cloud free tiers.
    Falls back to Gmail SMTP (Port 587) when configured.
    """
    if not settings.is_email_configured:
        logger.error(
            "No email delivery provider configured: Set RESEND_API_KEY or SMTP credentials in .env"
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The email delivery service is not configured on this server. Please contact Teshav directly."
        )

    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    html_content = generate_html_template(name, email, subject, message, timestamp, ip_address)
    plain_content = generate_plain_template(name, email, subject, message, timestamp, ip_address)

    if settings.is_resend_configured:
        return send_via_resend(name, email, subject, html_content, plain_content)

    return send_via_smtp(name, email, subject, html_content, plain_content)
