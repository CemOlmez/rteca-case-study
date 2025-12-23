from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.franchise import Franchise
from app.schemas.franchise import FranchiseCreate, FranchiseResponse

router = APIRouter()

@router.post("/franchises", response_model=FranchiseResponse)
def create_franchise(
    data: FranchiseCreate,
    db: Session = Depends(get_db)
):
    franchise = Franchise(**data.dict())
    db.add(franchise)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Franchise with this tax number already exists"
        )

    db.refresh(franchise)
    return franchise

@router.get("/franchises", response_model=list[FranchiseResponse])
def list_franchises(db: Session = Depends(get_db)):
    return db.query(Franchise).all()

@router.put("/franchises/{franchise_id}", response_model=FranchiseResponse)
def update_franchise(
    franchise_id: int,
    data: FranchiseCreate,
    db: Session = Depends(get_db)
):
    franchise = db.query(Franchise).filter(
        Franchise.id == franchise_id
    ).first()

    if not franchise:
        raise HTTPException(status_code=404, detail="Franchise not found")

    for key, value in data.dict().items():
        setattr(franchise, key, value)

    db.commit()
    db.refresh(franchise)
    return franchise


@router.delete("/franchises/{franchise_id}")
def delete_franchise(
    franchise_id: int,
    db: Session = Depends(get_db),
):
    franchise = db.query(Franchise).filter(
        Franchise.id == franchise_id
    ).first()

    if not franchise:
        raise HTTPException(status_code=404, detail="Franchise not found")

    db.delete(franchise)
    db.commit()

    return {"message": "Franchise deleted"}
