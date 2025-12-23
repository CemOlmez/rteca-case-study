from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Franchise(Base):
    __tablename__ = "franchises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    tax_number = Column(String, nullable=False, unique=True, index=True)

    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    address = Column(String, nullable=True)
    about = Column(Text, nullable=True) 

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    branches = relationship(
        "Branch",
        back_populates="franchise",
        cascade="all, delete"
    )
