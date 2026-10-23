import os
import pytest
from unittest.mock import MagicMock, patch
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings
from app.core.security import rate_limiter
from app.services.storage_service import init_db


@pytest.fixture(autouse=True)
def setup_test_environment(tmp_path):
    """
    Configure a temporary isolated SQLite database and reset rate limiter before each test.
    Also ensures tests don't make live external calls via Resend API key.
    """
    test_db = tmp_path / "test_submissions.db"
    settings.SQLITE_DB_PATH = str(test_db)
    init_db()
    rate_limiter.reset()
    orig_resend = settings.RESEND_API_KEY
    settings.RESEND_API_KEY = ""
    yield
    settings.RESEND_API_KEY = orig_resend
    rate_limiter.reset()


@pytest.fixture
def client():
    """FastAPI TestClient fixture."""
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def mock_smtp():
    """
    Mock smtplib.SMTP to ensure NO live network calls are made during tests.
    """
    # Temporarily set dummy credentials for testing
    original_email = settings.SMTP_EMAIL
    original_password = settings.SMTP_APP_PASSWORD
    settings.SMTP_EMAIL = "test-sender@gmail.com"
    settings.SMTP_APP_PASSWORD = "test-mock-app-password"

    with patch("smtplib.SMTP") as mock_smtp_class:
        mock_instance = MagicMock()
        mock_smtp_class.return_value.__enter__.return_value = mock_instance
        yield mock_instance

    settings.SMTP_EMAIL = original_email
    settings.SMTP_APP_PASSWORD = original_password
