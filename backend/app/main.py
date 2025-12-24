from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.seed import seed

from app.api.routes.health import router as health_router
from app.api.routes.franchises import router as franchise_router
from app.api.routes.branches import router as branch_router

import time
from sqlalchemy.exc import OperationalError

app = FastAPI(title="RTECA Case Study API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    for _ in range(10):
        try:
            Base.metadata.create_all(bind=engine)
            seed()
            break
        except OperationalError:
            print("Database not ready, retrying...")
            time.sleep(1)


app.include_router(health_router, prefix="/api")
app.include_router(franchise_router, prefix="/api")
app.include_router(branch_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Backend is running"}
