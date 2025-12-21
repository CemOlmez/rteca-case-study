from pydantic import BaseModel, EmailStr
from typing import Optional

class BranchCreate(BaseModel):
    name: str
    city: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    consultants_count: int = 0
    is_active: bool = True
    franchise_id: int

class BranchResponse(BaseModel):
    id: int
    name: str
    city: str
    phone: Optional[str]
    email: Optional[str]
    consultants_count: int
    is_active: bool
    franchise_id: int

    class Config:
        from_attributes = True
