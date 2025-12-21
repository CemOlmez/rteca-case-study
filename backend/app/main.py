from fastapi import FastAPI
from app.database import engine, Base
from app.models.franchise import Franchise
from app.models.branch import Branch
from app.api.health import router as health_router
from app.api.franchises import router as franchise_router
from app.api.branches import router as branch_router

app = FastAPI(title="RTECA Case Study API")

Base.metadata.create_all(bind=engine)

app.include_router(health_router, prefix="/api")
app.include_router(franchise_router, prefix="/api")
app.include_router(branch_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Backend is running"}

