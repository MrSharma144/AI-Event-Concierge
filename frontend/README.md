# AI Event Concierge

A beautiful, functional Full-Stack application that uses AI to plan corporate offsites based on natural language input.

## Features
- **AI Intelligence**: Powered by Google's Gemini LLM to process descriptions and generate valid JSON venue proposals.
- **Modern UI**: Completely styled with Tailwind CSS, featuring glassmorphism, dynamic gradients, lucide-react icons, and smooth animations.
- **Data Persistence**: Backed by a Django REST Framework API and SQLite DB to maintain a history of previous searches.

## Setup
### Backend (Django)
1. Navigate to the `backend/` directory and activate the python environment.
2. Install dependencies: `pip install -r ../requirements.txt`.
3. Create a `.env` file with `GEMINI_API_KEY`.
4. Run migrations: `python manage.py migrate`.
5. Start server: `python manage.py runserver`.

### Frontend (Vite + React)
1. Navigate to the `frontend/` directory.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev`.

The frontend communicates automatically with `http://127.0.0.1:8000/api/`.
