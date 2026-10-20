import time
import re
from typing import Dict, List
from collections import defaultdict
from threading import Lock
from fastapi import HTTPException, Request, status
from app.core.config import settings

class InMemoryRateLimiter:
    """
    Thread-safe sliding-window rate limiter per client IP.
    """
    def __init__(self, requests_per_minute: int = 5):
        self.limit = requests_per_minute
        self.window = 60.0  # seconds
        self._history: Dict[str, List[float]] = defaultdict(list)
        self._lock = Lock()

    def check(self, ip: str) -> None:
        """
        Check if the given IP has exceeded the rate limit.
        Raises HTTPException(429) if exceeded.
        """
        now = time.time()
        with self._lock:
            # Purge entries older than the window
            timestamps = [t for t in self._history[ip] if now - t < self.window]
            
            if len(timestamps) >= self.limit:
                retry_after = int(self.window - (now - timestamps[0])) + 1
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"Rate limit exceeded. Please wait {retry_after} seconds before submitting again.",
                    headers={"Retry-After": str(retry_after)}
                )

            # Record this request
            timestamps.append(now)
            self._history[ip] = timestamps

    def reset(self) -> None:
        """Reset rate limiter state (useful for tests)."""
        with self._lock:
            self._history.clear()


rate_limiter = InMemoryRateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)


def get_client_ip(request: Request) -> str:
    """
    Extract client IP address considering proxy headers (X-Forwarded-For).
    """
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        # First IP in comma-separated list is the original client
        return forwarded.split(",")[0].strip()
    
    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()
        
    if request.client and request.client.host:
        return request.client.host

    return "127.0.0.1"


def sanitize_header_value(value: str) -> str:
    """
    Prevent email header injection by rejecting or stripping carriage returns and newlines.
    """
    if re.search(r"[\r\n]", value):
        raise ValueError("Line breaks are not allowed in this field to prevent header injection.")
    return value.strip()
