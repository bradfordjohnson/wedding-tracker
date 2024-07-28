from database import Base
from sqlalchemy import Column, Integer, String, Date, Float
from datetime import date

class Expenses(Base):
    __tablename__ = "expenses"
    
    id = Column(Integer, primary_key=True, index=True)
    version = Column(String, index=True)
    category = Column(String, index=True)
    subcategory = Column(String, index=True)
    name = Column(String)
    date_due = Column(Date, nullable=True)
    cost = Column(Float)
    amount_paid_to_date = Column(Float, nullable=True)
    amount_saved_to_date = Column(Float, nullable=True)
    savings_bucket = Column(String, nullable=True)
    amount_expected = Column(Float, nullable=True)
    reciepts = Column(String, nullable=True)
