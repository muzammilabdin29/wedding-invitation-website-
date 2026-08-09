# Project Memory: Wedding Invitation Website

## Overview
A royal Udaipur-themed wedding invitation website rebuilt as a full-stack application. It features an interactive UI for guests and a backend to manage RSVP submissions.

## Tech Stack
- **Frontend**: Plain HTML, CSS, Vanilla JavaScript. Served via Nginx in Docker.
- **Backend**: Python, FastAPI, SQLAlchemy, SQLite (Postgres supported via `DATABASE_URL`).
- **Containerization**: Docker, Docker Compose for local execution and deployment.

## Project Structure
- `frontend/`: Contains the UI. Entry point is `index.html`. Styles in `css/style.css`, logic in `js/script.js`. Nginx configuration is `nginx.conf`.
- `backend/`: FastAPI application. 
  - `app/main.py`: Entry point for FastAPI.
  - `app/models.py` & `app/schemas.py`: Database models and Pydantic schemas.
  - `app/routers/rsvp.py`: Contains API endpoints for RSVP handling.
  - `data/`: SQLite data folder (ignored in git).
- `docker-compose.yml`: Local setup running both frontend and backend.
- `README.md`: Instructions for setup and deployment.

## Key Features
- **Interactive UI**: Animated "Open Invitation" gate, live countdown, timeline, and photo gallery.
- **RSVP System**: Guests can RSVP, data is submitted to the FastAPI backend and stored in the database.
- **Responsive Design**: Built for both desktop and mobile views.

## Development Notes
- When running locally without Docker, the frontend (`http://localhost:5500`) needs `window.API_BASE = "http://localhost:8000"` to communicate with the backend.
- With Docker Compose (`docker compose up --build`), Nginx automatically proxies `/api` to the backend.
- RSVP data is persisted via a Docker volume (`backend_data` or `wedding_data` depending on compose/manual run).

## Guidelines for AI Assistant
- Update this `memory.md` file whenever significant architectural, structural, or business logic changes are made to the codebase.
- Maintain the vanilla nature of the frontend (no build tools like Webpack/Vite unless requested).
- Ensure any new backend endpoints follow the existing FastAPI + SQLAlchemy structure.
