from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class FranchiseCreate(BaseModel):
    name: str
    tax_number: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    about: Optional[str] = None 
    is_active: bool = True

class FranchiseResponse(BaseModel):
    id: int
    name: str
    tax_number: str
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]
    about: Optional[str]      
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
