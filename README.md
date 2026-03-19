# AI Event Concierge 🥂🤖

AI Event Concierge is a premium, AI-powered platform designed to revolutionize corporate event planning. By leveraging the **Gemini 1.5 Flash** model, the application transforms natural language queries into structured, high-fidelity venue proposals, complete with cost estimates and strategic justifications.

## ✨ Key Features
- **Multi-Venue Suggestions**: Get multiple distinct venue options when requested (e.g., "Suggest 3 venues..."), otherwise provides the single best recommendation.
- **Glassmorphism UI**: A "Serene Tech" aesthetic with modern dark mode, gradients, and micro-animations using Framer Motion.
- **Persistent Dashboard**: Real-time proposal display alongside a persistent history of previous searches.
- **Interactive History**: View all proposals from past searches in a dedicated section with popup details.
- **Production Ready**: Configured for PostgreSQL on Render and high-performance frontend hosting on Vercel.

---

## 🏗️ Project Structure
```text
AI Event Concierge/
├── backend/                # Django REST API
│   ├── backend/            # Project settings & URL routing
│   ├── events/             # App logic (Models, Views, AI Services)
│   ├── manage.py           # Django entry point
│   ├── requirements.txt    # Python dependencies (requires psycopg[binary])
│   └── runtime.txt         # Specifies Python version (3.13.0) for Render
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/     # UI Components (ProposalCard, HistoryList, etc.)
│   │   ├── App.jsx         # Main application logic
│   │   └── index.css       # Custom styles & Tailwind directives
│   ├── vercel.json         # SPA routing for Vercel deployment
│   └── vite.config.js      # Vite build configuration
└── README.md               # Project documentation
```

---

## 🚀 Local Setup Instructions

### 1. Prerequisites
- **Python 3.12+**
- **Node.js 18+** & **npm**
- **Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

### 2. Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/scripts/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Configure Environment Variables:**
Create a `.env` file in the `backend/` directory using `.env.example` as a template:
```env
SECRET_KEY='your-secret-key'
GEMINI_API_KEY='your-gemini-key'
DEBUG=True
DATABASE_URL='' # Leave empty for SQLite, or use your Postgres URL
```

**Run Migrations & Start Server:**
```bash
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

---

## ☁️ Deployment

### 1. Backend (Render)
- **Repo Base Directory**: `backend`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn backend.wsgi:application`
- **Environment Variables**:
  - `DATABASE_URL`: Your Render Postgres URL.
  - `GEMINI_API_KEY`: Your Gemini key.
  - `SECRET_KEY`: A secure random string.
  - `ALLOWED_HOSTS`: `your-backend.onrender.com`
  - `CSRF_TRUSTED_ORIGINS`: `https://your-frontend.vercel.app`

### 2. Frontend (Vercel)
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Environment Variables**:
  - `VITE_API_URL`: `https://your-backend.onrender.com/api`

---

## 🛠️ Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Django 5.x, Django REST Framework.
- **AI Engine**: Google Gemini 1.5 Flash.
- **Database**: SQLite (Dev) / PostgreSQL (Prod).

---

## 👤 Author
- **MrSharma** - [GitHub Profile](https://github.com/MrSharma144)
