import smtplib
import socket
from fastapi import status
from app.core.config import settings


def test_contact_submission_success(client, mock_smtp):
    """Test valid contact submission dispatches successfully via mocked SMTP."""
    payload = {
        "name": "Sarah Connor",
        "email": "sarah.connor@example.com",
        "subject": "AI Project Collaboration",
        "message": "Hi Teshav, I was really impressed by your RAG Career Intelligence project."
    }

    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert "sent successfully" in data["message"]

    # Verify SMTP mock interactions
    mock_smtp.ehlo.assert_called()
    mock_smtp.starttls.assert_called_once()
    mock_smtp.login.assert_called_once_with("test-sender@gmail.com", "test-mock-app-password")
    mock_smtp.send_message.assert_called_once()


def test_contact_validation_invalid_email(client):
    """Test that malformed email addresses are rejected with 422."""
    payload = {
        "name": "John Doe",
        "email": "not-a-valid-email",
        "subject": "General Inquiry",
        "message": "This is a valid length test message for the contact endpoint."
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    data = response.json()
    assert data["success"] is False


def test_contact_validation_short_message(client):
    """Test that messages under 10 characters are rejected with 422."""
    payload = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "subject": "Hello",
        "message": "Short"
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_contact_validation_header_injection_subject(client):
    """Test that newline characters in subject are rejected to prevent header injection."""
    payload = {
        "name": "Attacker",
        "email": "attacker@example.com",
        "subject": "Inquiry\nBcc: victim@example.com",
        "message": "Attempting email header injection through multiline subject."
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_contact_validation_header_injection_name(client):
    """Test that newline characters in name are rejected to prevent header injection."""
    payload = {
        "name": "Attacker\r\nCc: spam@example.com",
        "email": "attacker@example.com",
        "subject": "Normal Subject",
        "message": "Attempting email header injection through multiline name field."
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_contact_honeypot_triggers_rejection(client):
    """Test that bots populating the hidden honeypot website field are rejected with 400."""
    payload = {
        "name": "Spam Bot",
        "email": "bot@spammer.org",
        "subject": "Cheap SEO Services",
        "message": "Buy cheap backlinks today to boost your search rankings instantly.",
        "website": "http://spamsite.example.com"
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_contact_rate_limiting(client, mock_smtp):
    """Test that exceeding the rate limit triggers HTTP 429 Too Many Requests."""
    payload = {
        "name": "Rapid Sender",
        "email": "rapid@example.com",
        "subject": "Rapid Fire Message",
        "message": "Testing sliding window rate limit threshold for submissions."
    }

    # Allowed limit is 5 requests per minute
    for _ in range(5):
        resp = client.post("/api/contact", json=payload)
        assert resp.status_code == status.HTTP_200_OK

    # 6th request from same client IP must trigger 429
    blocked_resp = client.post("/api/contact", json=payload)
    assert blocked_resp.status_code == status.HTTP_429_TOO_MANY_REQUESTS
    assert "Retry-After" in blocked_resp.headers


def test_contact_unconfigured_smtp(client):
    """Test that when SMTP credentials are not configured, endpoint returns 503."""
    # Ensure credentials are empty
    original_email = settings.SMTP_EMAIL
    original_password = settings.SMTP_APP_PASSWORD
    settings.SMTP_EMAIL = ""
    settings.SMTP_APP_PASSWORD = ""

    payload = {
        "name": "Tester",
        "email": "tester@example.com",
        "subject": "Configuration Test",
        "message": "Testing server response when SMTP credentials are missing."
    }

    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
    assert "not configured" in response.json()["detail"].lower()

    # Restore
    settings.SMTP_EMAIL = original_email
    settings.SMTP_APP_PASSWORD = original_password


def test_contact_smtp_authentication_failure(client, mock_smtp):
    """Test that SMTP authentication errors return 502 without leaking secrets."""
    mock_smtp.login.side_effect = smtplib.SMTPAuthenticationError(535, b"Authentication failed")

    payload = {
        "name": "Tester",
        "email": "tester@example.com",
        "subject": "Auth Failure Test",
        "message": "Testing handling of invalid Google App Password without credential leakage."
    }

    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_502_BAD_GATEWAY
    detail = response.json()["detail"]
    assert "authenticate" in detail.lower()
    # Ensure neither password nor raw auth string is present in response
    assert "test-mock-app-password" not in detail


def test_contact_smtp_timeout(client, mock_smtp):
    """Test that SMTP network timeout returns 504 Gateway Timeout."""
    mock_smtp.send_message.side_effect = socket.timeout("Connection timed out")

    payload = {
        "name": "Tester",
        "email": "tester@example.com",
        "subject": "Timeout Test",
        "message": "Testing handling of network timeout during email dispatch."
    }

    response = client.post("/api/contact", json=payload)
    assert response.status_code == status.HTTP_504_GATEWAY_TIMEOUT
