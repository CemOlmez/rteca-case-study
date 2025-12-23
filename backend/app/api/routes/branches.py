from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.branch import Branch
from app.schemas.branch import BranchCreate, BranchResponse

router = APIRouter()

@router.post("/branches", response_model=BranchResponse)
def create_branch(
    data: BranchCreate,
    db: Session = Depends(get_db),
):
    branch = Branch(**data.dict())
    db.add(branch)
    db.commit()
    db.refresh(branch)
    return branch


@router.get("/branches", response_model=list[BranchResponse])
def get_all_branches(db: Session = Depends(get_db)):
    return db.query(Branch).all()


@router.get(
    "/franchises/{franchise_id}/branches",
    response_model=list[BranchResponse],
)
def get_branches_by_franchise(
    franchise_id: int,
    db: Session = Depends(get_db),
):
    return (
        db.query(Branch)
        .filter(Branch.franchise_id == franchise_id)
        .all()
    )


@router.put("/branches/{branch_id}", response_model=BranchResponse)
def update_branch(
    branch_id: int,
    data: BranchCreate,
    db: Session = Depends(get_db),
):
    branch = db.query(Branch).filter(Branch.id == branch_id).first()

    if not branch:
        raise HTTPException(status_code=404, detail="Branch not found")

    for key, value in data.dict().items():
        setattr(branch, key, value)

    db.commit()
    db.refresh(branch)
    return branch


@router.delete("/branches/{branch_id}")
def delete_branch(
    branch_id: int,
    db: Session = Depends(get_db),
):
    branch = db.query(Branch).filter(Branch.id == branch_id).first()

    if not branch:
        raise HTTPException(status_code=404, detail="Branch not found")

    db.delete(branch)
    db.commit()

    return {"message": "Branch deleted successfully"}
