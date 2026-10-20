import os
import sqlite3
import logging
from datetime import datetime, timezone
from typing import Optional
from app.core.config import settings

logger = logging.getLogger(__name__)


def init_db() -> None:
    """
    Initialize SQLite database for contact submissions if not already present.
    """
    try:
        db_path = settings.SQLITE_DB_PATH
        # Ensure parent directory exists if a path with directories is configured
        db_dir = os.path.dirname(db_path)
        if db_dir:
            os.makedirs(db_dir, exist_ok=True)

        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS contact_submissions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    message TEXT NOT NULL,
                    status TEXT NOT NULL,
                    ip_address TEXT,
                    created_at TIMESTAMP NOT NULL
                )
            """)
            conn.commit()
    except Exception as exc:
        logger.error(f"Failed to initialize contact submissions database: {exc}")


def log_contact_submission(
    name: str,
    email: str,
    subject: str,
    message: str,
    status: str,
    ip_address: Optional[str] = None
) -> Optional[int]:
    """
    Log a contact form submission to SQLite.
    Returns the submission ID or None if an error occurs.
    """
    try:
        db_path = settings.SQLITE_DB_PATH
        now = datetime.now(timezone.utc).isoformat()
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO contact_submissions 
                (name, email, subject, message, status, ip_address, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (name, email, subject, message, status, ip_address or "unknown", now))
            conn.commit()
            return cursor.lastrowid
    except Exception as exc:
        # DB failure should not prevent user feedback
        logger.warning(f"Could not log contact submission to SQLite: {exc}")
        return None


def update_submission_status(submission_id: Optional[int], status: str) -> None:
    """
    Update the status of an existing submission (e.g. from 'pending' to 'sent' or 'failed').
    """
    if not submission_id:
        return
    try:
        db_path = settings.SQLITE_DB_PATH
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE contact_submissions
                SET status = ?
                WHERE id = ?
            """, (status, submission_id))
            conn.commit()
    except Exception as exc:
        logger.warning(f"Could not update submission status in SQLite: {exc}")
