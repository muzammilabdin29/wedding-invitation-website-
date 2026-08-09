# Shivam & Supriya — Royal Wedding Invitation (Full Stack) 💍

A royal full-stack wedding invitation website created for **Shivam & Supriya**'s wedding in Patna, Bihar (November 24, 2026).

- **Frontend:** HTML5, CSS3 (Custom animations, glassmorphism, responsive royal aesthetic), Vanilla JavaScript (Zero build tools required — served via Nginx container).
- **Backend:** Python 3.11 + FastAPI, SQLAlchemy ORM, Pydantic schemas, SQLite database (pluggable with PostgreSQL via `DATABASE_URL`).
- **Containerized:** Dockerized frontend and backend with `docker-compose.yml` for unified local execution and seamless cloud deployment.

---

## ✨ Features

- **Royal Entrance Gate:** Interactive opening gate with ambient gold particle effects and background music toggle.
- **Dynamic Live Countdown:** Real-time countdown timer to November 24, 2026.
- **Our Story Section:** Photo gallery featuring Shivam & Supriya.
- **Event Timeline:** Schedule for Engagement, Mehendi, Sangeet Night, and Wedding ceremonies.
- **Interactive RSVP System:** Real-time RSVP form allowing guests to confirm attendance, submit guest counts, and send personal wishes (persisted via FastAPI & SQLite database).
- **Venue Map:** Embedded interactive Google Maps location guide.
- **Admin & API Docs:** Interactive Swagger UI for RSVP management at `/docs`.

---

## 📁 Project Structure

```
wedding-invitation-website/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI entrypoint & CORS setup
│   │   ├── database.py        # SQLAlchemy engine & session management
│   │   ├── models.py          # Database model for RSVPs
│   │   ├── schemas.py         # Pydantic data validation schemas
│   │   ├── crud.py            # Database CRUD helper functions
│   │   └── routers/rsvp.py    # RSVP API endpoints (/api/rsvp)
│   ├── requirements.txt       # Python dependencies (FastAPI, uvicorn, sqlalchemy)
│   ├── Dockerfile             # Python FastAPI container configuration
│   └── .env.example
├── frontend/
│   ├── index.html             # Main invitation page markup
│   ├── css/style.css          # Royal theme styling, animations & fonts
│   ├── js/script.js           # Countdown timer, gate animations & RSVP API integration
│   ├── nginx.conf             # Nginx server configuration with API proxying
│   └── Dockerfile             # Nginx static server container
├── Photos/                    # Couple photography assets
├── docker-compose.yml         # Container orchestration configuration
├── .gitignore                 # Excluded files (virtual environments, database files, secrets)
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend
python -m venv .venv

# Activate Virtual Environment:
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Linux/macOS:
source .venv/bin/activate

# Install Dependencies & Run
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

> 💡 **Swagger API Documentation:** Once running, visit `http://localhost:8000/docs` to test endpoints and view submitted RSVPs.

---

### 2. Frontend Setup

Serve the `frontend` folder using any simple HTTP server:

```bash
cd frontend
python -m http.server 5500
```

Open `http://localhost:5500` in your browser. 

*Note: For local standalone running across different ports, add `<script>window.API_BASE = "http://localhost:8000";</script>` above `js/script.js` in `index.html`.*

---

## 🐳 Run with Docker Compose (Recommended)

Run both frontend and backend seamlessly without manually installing Python dependencies:

```bash
docker compose up --build
```

- **Frontend Application:** [http://localhost](http://localhost)
- **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

*Nginx automatically routes `/api/*` network calls to the backend container internally.*

To stop the containers:
```bash
docker compose down
```

---

## 🔗 Repository & GitHub Commands

This repository is hosted at:
`https://github.com/muzammilabdin29/wedding-invitation-website-.git`

To push recent changes to GitHub:

```bash
git add README.md
git commit -m "Update README with Shivam & Supriya wedding project details"
git push origin main
```

---

## 🛠️ API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Service health status check |
| **POST** | `/api/rsvp` | Submit guest RSVP confirmation |
| **GET** | `/api/rsvp` | Fetch list of all submitted RSVPs |
| **GET** | `/api/rsvp/summary` | Summary stats (attending count, guest totals) |

### Sample RSVP Payload (`POST /api/rsvp`)
```json
{
  "full_name": "Rohan Sharma",
  "guests": 2,
  "attending": true,
  "message": "Congratulations Shivam & Supriya! Looking forward to the celebration."
}
```

---

## 📜 License

Created with ❤️ for **Shivam & Supriya**'s Wedding Celebration.

