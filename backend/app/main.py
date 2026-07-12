from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine

app = FastAPI()

@app.get("/")
def home():
    with engine.connect() as conn:
        result = conn.execute(text("PRAGMA database_list;"))
        db = [dict(row._mapping) for row in result]

        tables = [
            row[0]
            for row in conn.execute(
                text("SELECT name FROM sqlite_master WHERE type='table';")
            )
        ]
    return {
        "database": db,
        "tables": tables
    }