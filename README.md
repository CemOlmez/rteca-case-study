# RTECA Case Study

A full-stack case study built for **RTECA**, showcasing a management system for **Franchises** and their related **Offices (Branches)**. The project demonstrates clean frontend architecture, a RESTful backend, and a fully Dockerized setup for fast and reliable local onboarding.

---

## Features

### Franchises
- Create, view, update, and delete franchises
- View franchise details in a reusable details modal
- Read-only → edit mode toggle using shared forms

### Offices (Branches)
- Create offices under a franchise
- View offices per franchise
- Update and delete offices
- Shared form logic for create / view / edit workflows

> ⚠️ **Note:** Some minor UI edge cases on the Offices page are known and will be finalized in the next iteration.

---

## Project Structure

```
rteca-case-study/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── franchises.py
│   │   │       ├── branches.py
│   │   │       └── health.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── forms/
│   │   │   └── details/
│   │   ├── api/
│   │   └── styles/
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | Next.js (App Router)          |
| UI         | React + TypeScript            |
| Forms      | React Hook Form               |
| Styling    | Tailwind CSS                  |
| Backend    | FastAPI                       |
| ORM        | SQLAlchemy                    |
| Database   | PostgreSQL                    |
| Validation | Pydantic                      |
| Container  | Docker + Docker Compose       |

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- Docker Compose (v2)

No local installation of PostgreSQL, Node.js, or Python is required when using Docker.

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rteca-case-study.git
cd rteca-case-study
```

---

### 2. Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

---

### 3. Access the Application

| Service  | URL                              |
|----------|----------------------------------|
| Frontend | http://localhost:3000            |
| Backend  | http://localhost:8000            |
| Health   | http://localhost:8000/health     |

---

## Environment Configuration

All environment variables are managed via Docker Compose.

### Frontend
```
NEXT_PUBLIC_API_URL=http://backend:8000/api
```

### Backend
```
DATABASE_URL=postgresql://rteca:rteca@db:5432/rteca_db
```

---

## API Usage

### Franchises

| Endpoint              | Method | Description                  |
|-----------------------|--------|------------------------------|
| `/api/franchises`     | GET    | Get all franchises           |
| `/api/franchises`     | POST   | Create a new franchise       |
| `/api/franchises/{id}`| GET    | Get a franchise by ID        |
| `/api/franchises/{id}`| PUT    | Update a franchise           |
| `/api/franchises/{id}`| DELETE | Delete a franchise           |

### Offices (Branches)

| Endpoint                              | Method | Description                      |
|---------------------------------------|--------|----------------------------------|
| `/api/branches`                       | GET    | Get all branches                 |
| `/api/branches`                       | POST   | Create a new branch              |
| `/api/branches/{id}`                  | GET    | Get a branch by ID               |
| `/api/branches/{id}`                  | PUT    | Update a branch                  |
| `/api/branches/{id}`                  | DELETE | Delete a branch                  |
| `/api/franchises/{franchise_id}/branches` | GET | Get all branches for a franchise |

### Health

| Endpoint   | Method | Description           |
|------------|--------|-----------------------|
| `/health`  | GET    | Health check endpoint |

---

## Development Notes

- The frontend uses strict TypeScript checks and production builds
- Reusable UI components (Button, Select, Modal) extend native HTML props
- Forms are reused for create, read-only view, and edit modes
- Backend schemas, models, and frontend API types are aligned
- PostgreSQL data is persisted using Docker volumes

---

## Known Improvements & Next Steps

- Final fixes for Office page edge cases
- UI/UX polish (spacing, consistency, labels)
- Optional pagination and search enhancements
- Minor code cleanup and refactoring

---

## Testing

Testing wasn't added in this version due to time limitations and focus on core functionality. I plan to implement proper unit and integration tests in future iterations using Jest/React Testing Library for the frontend and pytest for the backend.

---

## Assumptions & Tradeoffs

- No authentication layer was added to keep the scope focused on CRUD operations
- No automated tests were included due to time constraints
- The project prioritizes clarity and correctness over feature depth
- Docker Compose is used for local orchestration only
- PostgreSQL data persists locally via Docker volumes but no cloud deployment was configured
- No frontend UI was optimized for mobile devices — focus was on desktop experience

---

## Author

**Cem Ölmez**  
Frontend-focused Full-Stack Developer

---

## Summary

This project demonstrates:

- Clean, reusable frontend architecture
- Type-safe React + TypeScript patterns
- RESTful backend design with FastAPI
- Fully Dockerized local setup
- Real-world CRUD workflows

---