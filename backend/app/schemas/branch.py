from pydantic import BaseModel

class BranchCreate(BaseModel):
    name: str
    city: str
    franchise_id: int

class BranchResponse(BaseModel):
    id: int
    name: str
    city: str
    franchise_id: int

    class Config:
        from_attributes = True
