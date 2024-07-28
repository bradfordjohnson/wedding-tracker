from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import List, Annotated, Optional, Dict, Any
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CURRENT_VERSION = "1.0.0"


def validate_version(version: str = Header(...)):
    if version != CURRENT_VERSION:
        raise HTTPException(status_code=400, detail="Invalid API version")


class ExpensesBase(BaseModel):
    version: str
    category: str
    subcategory: str
    name: str
    date_due: Optional[date] = None
    cost: float
    amount_paid_to_date: Optional[float] = None
    amount_saved_to_date: Optional[float] = None
    savings_bucket: Optional[str] = None
    amount_expected: Optional[float] = None
    reciepts: Optional[str] = None


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/list/expenses", response_model=List[ExpensesBase])
async def get_expenses(db: db_dependency, skip: int = 0, limit: int = 100):
    expenses = db.query(models.Expenses).offset(skip).limit(limit).all()
    return expenses


@app.get("/expense/{expense_id}")
async def get_expense(expense_id: int, db: db_dependency):
    result = db.query(models.Expenses).filter(models.Expenses.id == expense_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Expense not found")
    return result


@app.post("/add/expense")
async def add_expense(
    expense: ExpensesBase, db: db_dependency, version: str = Depends(validate_version)
):
    db_expense = models.Expenses(
        version=expense.version,
        category=expense.category,
        subcategory=expense.subcategory,
        name=expense.name,
        date_due=expense.date_due,
        cost=expense.cost,
        amount_paid_to_date=expense.amount_paid_to_date,
        amount_saved_to_date=expense.amount_saved_to_date,
        savings_bucket=expense.savings_bucket,
        amount_expected=expense.amount_expected,
        reciepts=expense.reciepts,
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return {"message": "Expense added successfully", "expense": db_expense}


@app.put("/update/expense/{expense_id}")
async def update_expense(
    expense_id: int,
    expense: ExpensesBase,
    db: db_dependency,
    version: str = Depends(validate_version),
):
    target_expense = (
        db.query(models.Expenses).filter(models.Expenses.id == expense_id).first()
    )

    target_expense.category = expense.category
    target_expense.subcategory = expense.subcategory
    target_expense.name = expense.name
    target_expense.date_due = expense.date_due
    target_expense.cost = expense.cost
    target_expense.amount_paid_to_date = expense.amount_paid_to_date
    target_expense.amount_saved_to_date = expense.amount_saved_to_date
    target_expense.savings_bucket = expense.savings_bucket
    target_expense.amount_expected = expense.amount_expected
    target_expense.reciepts = expense.reciepts

    db.commit()
    return {"message": "Expense updated successfully", "expense": target_expense}


@app.delete("/delete/expense/{expense_id}")
async def delete_expense(expense_id: int, db: db_dependency):
    target_expense = (
        db.query(models.Expenses).filter(models.Expenses.id == expense_id).first()
    )
    db.delete(target_expense)
    db.commit()
    return {"message": "Expense deleted successfully", "expense": target_expense}
