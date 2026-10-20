# Teshav Sharma — Portfolio Backend (FastAPI)

A high-performance, production-ready, and secure RESTful backend API powering **Teshav Sharma's** portfolio website. Built with **FastAPI**, **Pydantic v2**, and **Gmail SMTP**, featuring strict input validation, email header injection protection, sliding-window rate limiting, SQLite audit logging, and automated Pytest test suites.

---

## 1. Architecture Overview

```text
portfolio-backend/
├── app/
│   ├── main.py                  # FastAPI application factory, lifespan, CORS & routers
│   ├── core/
│   │   ├── config.py            # Pydantic Settings & environment variable configuration
│   │   └── security.py          # Sliding-window rate limiter & header injection guards
│   ├── routes/
│   │   ├── health.py            # GET /api/health
│   │   ├── contact.py           # POST /api/contact
│   │   ├── projects.py          # GET /api/projects & /api/projects/{id}
│   │   ├── skills.py            # GET /api/skills
│   │   ├── experience.py        # GET /api/experience
│   │   └── education.py         # GET /api/education
│   ├── schemas/
│   │   └── contact.py           # Pydantic validation models & sanitization
│   ├── services/
│   │   ├── email_service.py     # Gmail SMTP delivery (TLS 587) with HTML & plain templates
│   │   └── storage_service.py   # SQLite contact submission logger
│   └── data/
│       └── portfolio_data.py    # Structured source of truth for portfolio items
├── tests/
│   ├── conftest.py              # Mocked SMTP fixtures and TestClient setup
│   ├── test_health.py           # Health check and Swagger schema tests
│   ├── test_contact.py          # Contact validation, rate limit & SMTP error tests
│   └── test_portfolio.py        # Portfolio data retrieval & filtering tests
├── .env.example                 # Environment variable template with guide
├── .gitignore                   # Excludes secrets, databases, and caches
├── requirements.txt             # Production & test dependencies
├── run.py                       # Local Uvicorn server launcher
└── README.md                    # Backend documentation & deployment guide
```

---

## 2. API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and links to documentation |
| `GET` | `/docs` | Interactive Swagger UI documentation |
| `GET` | `/redoc` | Interactive ReDoc documentation |
| `GET` | `/api/health` | Service health status, version, and SMTP check |
| `POST` | `/api/contact` | Submit contact inquiry (delivered to Gmail inbox) |
| `GET` | `/api/projects` | List portfolio projects (with category & featured filters) |
| `GET` | `/api/projects/{id}` | Retrieve individual project by unique ID |
| `GET` | `/api/skills` | Categorized technical skills (GenAI, ML, DL, Backend, etc.) |
| `GET` | `/api/experience` | Internship and professional experience timeline |
| `GET` | `/api/education` | Academic degrees, university, and coursework details |

---

## 3. Contact Form Submission (`POST /api/contact`)

### Request Payload (`application/json`)
```json
{
  "name": "Sarah Connor",
  "email": "sarah.connor@example.com",
  "subject": "Inquiry regarding AI/ML Engineering Collaboration",
  "message": "Hi Teshav, I reviewed your AI Career Intelligence project and would love to discuss an internship opportunity."
}
```

### Response (`200 OK`)
```json
{
  "success": true,
  "message": "Your message has been sent successfully to Teshav Sharma.",
  "timestamp": "2026-10-20T03:00:00.000000+00:00"
}
```

### Security & Validation Rules
- **Length Limits**: Name (2–100 chars), Subject (3–150 chars), Message (10–5,000 chars).
- **Anti-Header Injection**: Fields reject carriage returns (`\r`) and newlines (`\n`) to prevent BCC/CC injection attacks.
- **Honeypot Trap**: Invisible `website` field rejects automated bot submissions with HTTP 400.
- **Sliding-Window Rate Limiting**: Defaults to 5 submissions per minute per IP address. Exceeding triggers HTTP 429 with `Retry-After` header.
- **Credential Protection**: SMTP credentials, passwords, and raw system stack traces are never exposed in API responses or logs.

---

## 4. Gmail SMTP Setup (Google App Password)

To allow the FastAPI backend to send emails directly into your Gmail inbox:

> [!IMPORTANT]
> **Never use your standard Google account password.** Gmail requires a 16-character **Google App Password** when connecting via SMTP.

### Step-by-Step Instructions:
1. Open your Google Account at **https://myaccount.google.com/**.
2. Select **Security** from the left navigation panel.
3. Under **How you sign in to Google**, ensure **2-Step Verification** is turned **ON**.
4. In the search bar at the top of your Google Account page, search for **App Passwords** (or navigate directly to **https://myaccount.google.com/apppasswords**).
5. Give your App Password a descriptive name (e.g. `Portfolio Backend`).
6. Click **Create**. Google will display a **16-character code** (e.g., `abcd efgh ijkl mnop`).
7. Copy this code (spaces can be removed or kept) and paste it into your `.env` file as `SMTP_APP_PASSWORD`.

---

## 5. Local Setup & Installation (Windows)

### Prerequisites
- Python 3.10+ installed
- PowerShell or Command Prompt

### Step 1: Open the backend folder
```powershell
cd d:\teshav-portfolio\portfolio-backend
```

### Step 2: Create and activate a virtual environment (Recommended)
```powershell
python -m venv venv
.\venv\Scripts\activate
```

### Step 3: Install dependencies
```powershell
pip install -r requirements.txt
```

### Step 4: Configure environment variables
Copy `.env.example` to `.env`:
```powershell
copy .env.example .env
```
Open `.env` in an editor and enter your credentials:
```env
ENVIRONMENT=development
DEBUG=True

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your.gmail.address@gmail.com
SMTP_APP_PASSWORD=your_16_char_google_app_password
CONTACT_RECEIVER_EMAIL=teshavsharma74@gmail.com

RATE_LIMIT_PER_MINUTE=5
SQLITE_DB_PATH=contact_submissions.db
```

---

## 6. Running the Backend Server

Start the server using `run.py`:
```powershell
python run.py
```
Or directly using `uvicorn`:
```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Once running:
- **API Base URL**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`
- **ReDoc Documentation**: `http://127.0.0.1:8000/redoc`
- **Health Check**: `http://127.0.0.1:8000/api/health`

---

## 7. Connecting the React Frontend

The portfolio frontend in `d:\teshav-portfolio` is already pre-configured to communicate with this backend.

To connect it:
1. In the root directory `d:\teshav-portfolio`, create or update `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
2. Restart the Vite dev server if running (`npm run dev`).
3. Submitting the contact form on the frontend website will now automatically route through `http://localhost:8000/api/contact`, store the record in SQLite, and dispatch an email directly to your Gmail inbox!

---

## 8. Running Automated Tests

Run the full automated test suite using `pytest`:
```powershell
pytest
```
Or with verbose output:
```powershell
pytest -v -s
```

All SMTP communication is automatically mocked during tests using `unittest.mock`. **No real emails are ever dispatched during test runs.**

---

## 9. Production Deployment Guide

### Option A: Render (Recommended Free/Low-Cost Tier)
1. Push your code to GitHub.
2. In the Render Dashboard, create a **New Web Service**.
3. Select your repository.
4. Set:
   - **Root Directory**: `portfolio-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Under **Environment Variables**, add:
   - `ENVIRONMENT` = `production`
   - `ALLOWED_ORIGINS` = `https://your-portfolio-domain.com`
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_EMAIL` = `your.gmail.address@gmail.com`
   - `SMTP_APP_PASSWORD` = `your_16_char_google_app_password`
   - `CONTACT_RECEIVER_EMAIL` = `teshavsharma74@gmail.com`

### Option B: Railway
1. Create a new Railway project from your GitHub repository.
2. Set Root Directory to `portfolio-backend`.
3. Railway automatically detects `requirements.txt` and starts with `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
4. Add the environment variables from `.env.example`.

### Option C: Ubuntu Linux VPS (systemd + Nginx)
1. Clone the repo and set up Python venv.
2. Configure a systemd service `/etc/systemd/system/portfolio-backend.service`:
   ```ini
   [Unit]
   Description=Teshav Sharma Portfolio FastAPI Backend
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/var/www/portfolio-backend
   ExecStart=/var/www/portfolio-backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 2
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
3. Set up Nginx reverse proxy with SSL via Let's Encrypt Certbot.
