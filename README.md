# Aarav & Diya — Wedding Invitation (Full Stack)

A royal Udaipur-themed wedding invitation website, cloned and rebuilt as a full
stack app:

- **Frontend:** HTML, CSS, vanilla JavaScript (no framework build step — runs
  anywhere, served by Nginx in Docker)
- **Backend:** Python + FastAPI, SQLAlchemy, SQLite by default (swap in
  Postgres via `DATABASE_URL`)
- **Containerized:** separate Dockerfiles for frontend/backend + a
  `docker-compose.yml` to run both together

Features: animated "Open Invitation" gate, live countdown to the wedding,
couple's story, event timeline (Engagement / Mehendi / Sangeet / Wedding),
parents' blessings, embedded Google Maps venue, and a working **RSVP form**
that POSTs to the FastAPI backend and is persisted in a database.

---

## 1. Project structure

```
wedding-invitation-website/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app entrypoint
│   │   ├── database.py        # SQLAlchemy engine/session
│   │   ├── models.py          # RSVP table model
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── crud.py            # DB operations
│   │   └── routers/rsvp.py    # /api/rsvp endpoints
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   ├── js/script.js
│   ├── nginx.conf             # serves static files + proxies /api
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

---

## 2. Run locally without Docker (fastest for editing)

**Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs are now at http://localhost:8000/docs

**Frontend:**

Since the frontend is plain HTML/CSS/JS, just serve the folder — e.g.:

```bash
cd frontend
python -m http.server 5500
```

Open http://localhost:5500. Because the frontend and backend run on
different ports locally, tell the page where the API lives by adding this
line **above** the `<script src="js/script.js">` tag in `index.html`:

```html
<script>window.API_BASE = "http://localhost:8000";</script>
```

(When running through Docker Compose below, this isn't needed — Nginx
proxies `/api` to the backend automatically.)

---

## 3. Run everything with Docker Compose (recommended)

Requires Docker + Docker Compose installed.

```bash
docker compose up --build
```

- Frontend → http://localhost
- Backend API → http://localhost:8000 (docs at `/docs`)
- The frontend's Nginx container proxies any `/api/*` request to the
  backend container, so the two talk to each other over Docker's internal
  network — no CORS/base-URL config needed.

Stop with `Ctrl+C`, or run detached:

```bash
docker compose up --build -d
docker compose logs -f
docker compose down
```

RSVP data is persisted in a named Docker volume (`backend_data`) so it
survives container restarts.

### Build/run containers individually (no compose)

```bash
# Backend
cd backend
docker build -t wedding-backend .
docker run -p 8000:8000 -v wedding_data:/app/data wedding-backend

# Frontend
cd frontend
docker build -t wedding-frontend .
docker run -p 80:80 wedding-frontend
```

---

## 4. Push to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial commit: full stack wedding invitation"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

The `.gitignore` already excludes `__pycache__/`, virtual envs, the SQLite
data folder, and `.env` files, so secrets/local data won't be pushed.

---

## 5. Deployment options

### Option A — Single VM / VPS with Docker Compose (simplest)
1. Install Docker + Docker Compose on the server.
2. `git clone` your repo, `cd` into it.
3. `docker compose up --build -d`
4. Point a domain at the server's IP and put Nginx/Caddy or a cloud load
   balancer in front for HTTPS (e.g. Caddy auto-TLS, or an Nginx reverse
   proxy + Certbot).

### Option B — Split deployment (frontend + backend on different platforms)
- **Frontend (static):** deploy `frontend/` to Vercel, Netlify, GitHub
  Pages, or Cloudflare Pages. Since there's no build step, set the deploy
  command to nothing and the output directory to `frontend/`.
  - Add `window.API_BASE = "https://your-backend-url.com"` before the
    `script.js` include so it knows where the API lives.
- **Backend:** deploy `backend/` (with its Dockerfile) to Render, Railway,
  Fly.io, or AWS/GCP/Azure container services. Set `CORS_ORIGINS` to your
  frontend's exact domain (comma-separated for multiple).

### Option C — Container registry + orchestrator
Build and push both images, then run them on any container platform
(ECS, Cloud Run, Kubernetes, etc.):

```bash
docker build -t <registry>/wedding-backend:latest ./backend
docker push <registry>/wedding-backend:latest

docker build -t <registry>/wedding-frontend:latest ./frontend
docker push <registry>/wedding-frontend:latest
```

For Cloud Run / ECS, deploy the backend first, note its public URL, then
either rebuild the frontend image with that URL baked into `index.html`
(`window.API_BASE = "..."`) or configure your reverse proxy to route
`/api` to the backend service, mirroring `nginx.conf`.

---

## 6. Environment variables (backend)

| Variable        | Default                          | Description                                   |
|-----------------|-----------------------------------|------------------------------------------------|
| `DATABASE_URL`  | `sqlite:///./data/wedding.db`     | Any SQLAlchemy-compatible URL (Postgres, MySQL)|
| `CORS_ORIGINS`  | `*`                                | Comma-separated allowed origins, or `*`        |

Copy `backend/.env.example` to `backend/.env` and adjust as needed (the app
reads `os.environ`; wire up `python-dotenv` loading in `main.py` if you want
`.env` auto-loaded outside Docker — Docker Compose already passes these via
the `environment:` block).

---

## 7. API reference

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| GET    | `/api/health`         | Health check                         |
| POST   | `/api/rsvp`            | Submit an RSVP                       |
| GET    | `/api/rsvp`             | List all RSVPs                       |
| GET    | `/api/rsvp/summary`     | Totals: accepted / declined / guests |

**POST `/api/rsvp` body:**

```json
{
  "full_name": "Riya Kapoor",
  "guests": 2,
  "attending": true,
  "message": "Can't wait to celebrate with you both!"
}
```

Full interactive docs (Swagger UI) are always available at `/docs` on the
backend.

---

## 8. Customizing for your own wedding

- Names/dates/venues: edit the text directly in `frontend/index.html`.
- Colors/fonts: edit the CSS custom properties at the top of
  `frontend/css/style.css` (`:root { --maroon, --gold, --cream, ... }`).
- Countdown target date: `frontend/js/script.js` → the `target` date in
  `initCountdown()`.
- Photos: replace the Unsplash URLs in `index.html`, or drop local images
  into `frontend/assets/` and reference them as `assets/your-photo.jpg`.
