from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.branch import Branch
from app.schemas.branch import BranchCreate, BranchResponse

router = APIRouter()

@router.post("/branches", response_model=BranchResponse)
def create_branch(
    data: BranchCreate,
    db: Session = Depends(get_db)
):
    branch = Branch(**data.dict())
    db.add(branch)
    db.commit()
    db.refresh(branch)
    return branch

@router.get(
    "/franchises/{franchise_id}/branches",
    response_model=list[BranchResponse]
)
def get_branches(
    franchise_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Branch).filter(
        Branch.franchise_id == franchise_id
    ).all()
