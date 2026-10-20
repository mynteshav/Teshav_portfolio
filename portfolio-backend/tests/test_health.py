from fastapi import status


def test_root_endpoint(client):
    """Verify root endpoint responds with metadata and docs links."""
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "message" in data
    assert "docs_url" in data
    assert data["docs_url"] == "/docs"


def test_health_check_endpoint(client):
    """Verify health check endpoint returns 200 with operational metrics."""
    response = client.get("/api/health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "timestamp" in data
    assert "smtp_configured" in data


def test_swagger_documentation_accessible(client):
    """Verify OpenAPI and Swagger documentation endpoints are accessible."""
    docs_resp = client.get("/docs")
    assert docs_resp.status_code == status.HTTP_200_OK

    openapi_resp = client.get("/openapi.json")
    assert openapi_resp.status_code == status.HTTP_200_OK
    schema = openapi_resp.json()
    assert "paths" in schema
    assert "/api/contact" in schema["paths"]
    assert "/api/health" in schema["paths"]
    assert "/api/projects" in schema["paths"]
