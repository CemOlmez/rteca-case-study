from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)

    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    consultants_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    franchise_id = Column(Integer, ForeignKey("franchises.id"), nullable=False)

    franchise = relationship("Franchise", back_populates="branches")
