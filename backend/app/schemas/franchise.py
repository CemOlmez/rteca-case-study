from pydantic import BaseModel
from datetime import datetime

class FranchiseCreate(BaseModel):
    name: str
    tax_number: str
    is_active: bool = True

class FranchiseResponse(BaseModel):
    id: int
    name: str
    tax_number: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
