from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models import franchise, branch  # ensures models are registered

from app.api.routes.health import router as health_router
from app.api.routes.franchises import router as franchise_router
from app.api.routes.branches import router as branch_router

app = FastAPI(title="RTECA Case Study API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables (OK for case study)
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(health_router, prefix="/api")
app.include_router(franchise_router, prefix="/api")
app.include_router(branch_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Backend is running"}
