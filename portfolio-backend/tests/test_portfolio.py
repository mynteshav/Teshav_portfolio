from fastapi import status


def test_get_projects_list(client):
    """Test retrieving all portfolio projects."""
    response = client.get("/api/projects")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert data["count"] >= 4
    assert len(data["data"]) == data["count"]


def test_get_projects_filtered_by_category(client):
    """Test filtering projects by category."""
    response = client.get("/api/projects?category=Generative AI")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert all(p["category"] == "Generative AI" for p in data["data"])


def test_get_project_by_id_success(client):
    """Test retrieving a single project by ID."""
    response = client.get("/api/projects/ai-career-intelligence")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert data["data"]["id"] == "ai-career-intelligence"
    assert "tags" in data["data"]


def test_get_project_by_id_not_found(client):
    """Test 404 response for invalid project ID."""
    response = client.get("/api/projects/non-existent-project-slug")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_get_skills_categorized(client):
    """Test retrieving categorized technical skills."""
    response = client.get("/api/skills")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert data["count"] >= 5
    categories = [c["id"] for c in data["data"]]
    assert "gen-ai" in categories
    assert "ml" in categories
    assert "backend-deployment" in categories


def test_get_experience(client):
    """Test retrieving experience entries."""
    response = client.get("/api/experience")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert data["count"] >= 2
    companies = [e["company"] for e in data["data"]]
    assert "CodeClause" in companies
    assert "Response Infoway" in companies


def test_get_education(client):
    """Test retrieving education items."""
    response = client.get("/api/education")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["success"] is True
    assert data["count"] >= 2
    institutions = [edu["institution"] for edu in data["data"]]
    assert "JECRC University" in institutions
    assert "Poornima University" in institutions
