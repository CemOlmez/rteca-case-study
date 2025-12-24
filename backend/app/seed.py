from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.franchise import Franchise
from app.models.branch import Branch
import time


def seed():
    for _ in range(10):
        try:
            db: Session = SessionLocal()
            break
        except Exception:
            time.sleep(1)
    else:
        print("Database not ready, skipping seed")
        return
    if db.query(Franchise).first():
        print("Seed data already exists. Skipping.")
        db.close()
        return

    if db.query(Franchise).first():
        print("Seed data already exists. Skipping.")
        return

    f1 = Franchise(
        name="RTECA Istanbul",
        tax_number="1234567890",
        phone="+90 212 000 0000",
        email="istanbul@rteca.com",
        address="Istanbul"
    )

    f2 = Franchise(
        name="RTECA Ankara",
        tax_number="9876543210",
        phone="+90 312 000 0000",
        email="ankara@rteca.com",
        address="Ankara"
    )

    db.add_all([f1, f2])
    db.commit()

    b1 = Branch(
        name="Istanbul Office 1",
        phone="+90 212 111 1111",
        email="office1@rteca.com",
        city="Kadikoy",
        franchise_id=f1.id
    )

    b2 = Branch(
        name="Istanbul Office 2",
        phone="+90 212 222 2222",
        email="office2@rteca.com",
        city="Besiktas",
        franchise_id=f1.id
    )

    b3 = Branch(
        name="Ankara Office 1",
        phone="+90 312 111 1111",
        email="office1@rteca.com",
        city="Cankaya",
        franchise_id=f2.id
    )

    b4 = Branch(
        name="Ankara Office 2",
        phone="+90 312 222 2222",
        email="office2@rteca.com",
        city="Kizilay",
        franchise_id=f2.id
    )

    db.add_all([b1, b2, b3, b4])
    db.commit()

    db.close()
    print("Mock data seeded successfully.")

if __name__ == "__main__":
    seed()
