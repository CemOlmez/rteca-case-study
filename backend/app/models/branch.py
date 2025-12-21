from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    franchise_id = Column(Integer, ForeignKey("franchises.id"), nullable=False)

    franchise = relationship("Franchise", back_populates="branches")
