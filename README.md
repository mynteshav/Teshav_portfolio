# Teshav Sharma — AI & Machine Learning Engineer Portfolio v2

A modern, production-grade personal portfolio engineered for **Teshav Sharma**, an aspiring AI & Machine Learning Engineer specializing in Machine Learning, Generative AI, RAG pipelines, and Data Science.

Designed with dark-mode aesthetics, electric blue and violet accents, glassmorphic card surfaces, responsive typography, and an interactive GPU-friendly neural network background canvas.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom dark palette & glassmorphism
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand marks
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + Interactive HTML5 Canvas
- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 📁 Project Architecture

All source code and assets are strictly isolated inside `teshav-ai-portfolio-v2`:

```text
teshav-ai-portfolio-v2/
├── index.html                   # HTML5 entry with meta SEO & preconnected fonts
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Tailored dark color tokens & neon accents
├── postcss.config.js            # PostCSS pipeline
├── tsconfig.json                # TypeScript root configuration
├── public/
│   └── favicon.svg              # Custom TS monogram SVG favicon
└── src/
    ├── main.tsx                 # React entry point
    ├── App.tsx                  # Master application orchestrator
    ├── index.css                # Tailwind layers, glassmorphism, scrollbars
    ├── types/
    │   └── portfolio.ts         # TypeScript data model contracts
    ├── data/
    │   ├── profile.ts           # Bio, social links, and narrative
    │   ├── skills.ts            # Organized actual skills across 6 domains
    │   ├── projects.ts          # Featured projects with metrics & architecture
    │   ├── experience.ts        # Verified internships & impact
    │   └── education.ts         # JECRC University (MCA) & Poornima (BCA)
    ├── services/
    │   └── contactService.ts    # Decoupled FastAPI contact form integration
    ├── components/
    │   ├── Navbar.tsx           # Sticky navigation with active tracking & drawer
    │   ├── Footer.tsx           # Social links, dynamic copyright, back-to-top
    │   ├── SectionHeading.tsx   # Consistent section titles & badges
    │   ├── NeuralBackground.tsx # Interactive constellation/synapse canvas
    │   ├── ProjectCard.tsx      # Project card with tech badges & preview
    │   ├── ProjectModal.tsx     # Deep-dive architecture blueprint dialog
    │   ├── ResumeModal.tsx      # Curriculum Vitae request & credential summary
    │   └── SocialIcons.tsx      # Independent, crisp SVG brand marks
    └── sections/
        ├── Hero.tsx             # Professional introduction & toolset
        ├── About.tsx            # Engineering philosophy & academic path
        ├── Skills.tsx           # Filterable inventory of verified skills
        ├── Projects.tsx         # Filterable showcase with category tabs
        ├── Experience.tsx       # Vertical internship timeline
        ├── Education.tsx        # Formal degree credential cards
        └── Contact.tsx          # Validated contact form with modular API
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+` or `v20+` (tested on Node v22)
- npm `v9+` or `v10+`

### Installation

```bash
cd teshav-ai-portfolio-v2
npm install
```

> **Note for Windows Users:** If your PowerShell execution policy blocks `.ps1` scripts, use `npm.cmd` instead:
> ```powershell
> npm.cmd install
> ```

### Running the Development Server

```bash
npm run dev
# or on Windows:
npm.cmd run dev
```

The application will start on `http://localhost:5173`.

### Production Build & Preview

```bash
# Build the optimized production bundle
npm run build
# (or: npm.cmd run build)

# Preview production build locally
npm run preview
# (or: npm.cmd run preview)
```

### Linting

```bash
npm run lint
# (or: npm.cmd run lint)
```

---

## ⚙️ Connecting to a FastAPI Backend

The contact form is decoupled from the user interface and handled through `src/services/contactService.ts`.

### 1. Environment Variable Configuration

Create a `.env` file in `teshav-ai-portfolio-v2`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

When deployed to production (e.g. Vercel, Render, Railway, AWS), set `VITE_API_BASE_URL` to your live API domain (e.g. `https://api.yourdomain.com`).

### 2. FastAPI Endpoint Specification

Your FastAPI backend should expose a `POST /api/contact` endpoint expecting the following JSON payload:

```json
{
  "name": "Alex Chen",
  "email": "alex@example.com",
  "subject": "AI Engineering Internship",
  "message": "We would love to discuss an AI/ML role on our team..."
}
```

#### Example FastAPI Implementation:

```python
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Teshav Sharma Contact API")

# Configure CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://teshavsharma.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@app.post("/api/contact", status_code=status.HTTP_200_OK)
async def handle_contact_submission(payload: ContactMessage):
    try:
        # Example: Dispatch email via SMTP, SendGrid, or Resend
        # send_notification_email(payload)
        return {"status": "success", "detail": "Message dispatched successfully."}
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process message: {str(exc)}"
        )
```

### 3. Built-In Fallback Behavior

If `VITE_API_BASE_URL` is empty or if the backend server is unreachable:
1. The frontend notifies the user without crashing.
2. It offers an instant 1-click **"Send via Mail Client"** button that opens `mailto:teshavsharma74@gmail.com` with the visitor's subject and message body prefilled.
3. It provides a 1-click **"Copy Email"** button to copy `teshavsharma74@gmail.com` to the clipboard.

---

## 🎨 Content Customization

All personal details, skills, project narratives, experience, and education are centralized in `src/data/`:

| File | Content |
| :--- | :--- |
| `src/data/profile.ts` | Name, headline, narrative, social links, location, email |
| `src/data/skills.ts` | 6 skill categories and verified technologies |
| `src/data/projects.ts` | Project titles, metrics, problem/approach/outcomes, links |
| `src/data/experience.ts`| Internship timeline, duties, and technology stacks |
| `src/data/education.ts` | Degrees, universities, and highlights |

---

## 🔒 Security & Best Practices

- **Zero Secrets**: No API keys, database credentials, or SMTP passwords are stored in the client repository.
- **Client Validation**: Rigorous email regex and character bounds prevent empty/malformed dispatches.
- **Strict Isolation**: Runs completely independently of the previous portfolio in its own dedicated directory.
- **Accessibility**: Includes `aria-*` tags, keyboard navigation (`Escape` closes modals), and reduced-motion detection.
