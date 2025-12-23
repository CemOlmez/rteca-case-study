RTECA Case Study

A full-stack case study built for RTECA, showcasing a modern management system for Franchises and their related Offices (Branches).
The project demonstrates clean frontend architecture, a RESTful backend, and a fully Dockerized setup for fast local onboarding.

Features
Franchises

Create, view, update, and delete franchises

View franchise details in a reusable details modal

Read-only → edit mode toggle using shared forms

Offices (Branches)

Create offices under a franchise

View and manage offices per franchise

Update and delete offices

Shared form logic for create / view / edit flows

⚠️ Note: A few minor UI edge cases in the Offices page are known and will be finalized in the next iteration.

Project Structure
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

Tech Stack
Frontend

Next.js (App Router)

React

TypeScript

React Hook Form

Tailwind CSS

Backend

FastAPI

SQLAlchemy

PostgreSQL

Pydantic

DevOps

Docker

Docker Compose

Getting Started
Prerequisites

Docker

Docker Compose (v2)

No local installation of PostgreSQL, Node.js, or Python is required when using Docker.

Run with Docker Compose

From the project root:

docker compose up --build

Access the Application
Service	URL
Frontend	http://localhost:3000

Backend	http://localhost:8000

Health	http://localhost:8000/health
Environment Configuration

All environment variables are managed via Docker Compose.

Frontend
NEXT_PUBLIC_API_URL=http://backend:8000/api

Backend
DATABASE_URL=postgresql://rteca:rteca@db:5432/rteca_db

Development Notes

The frontend uses strict TypeScript checks and production builds.

Reusable UI components (Button, Select, Modal) extend native HTML props.

Forms are reused for create, read-only view, and edit modes.

Backend schemas, models, and frontend API types are aligned.

PostgreSQL data is persisted using Docker volumes.

Known Improvements & Next Steps

Final fixes for Office page edge cases

UI/UX polish (spacing, consistency, labels)

Optional pagination & search enhancements

Code cleanup & minor refactoring

Assumptions & Tradeoffs

No authentication layer was added to keep the scope focused.

No automated tests were included due to time constraints.

The project prioritizes clarity and correctness over feature depth.

Docker Compose is used for local orchestration only.

Author

Cem Ölmez
Frontend-focused Full-Stack Developer

Summary

This project demonstrates:

Clean, reusable frontend architecture

Type-safe React + TypeScript patterns

RESTful backend design with FastAPI

Fully Dockerized local setup

Real-world CRUD workflows