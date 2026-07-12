from pathlib import Path
from sqlalchemy import create_engine


db_path = Path("./app/data/Habit-tracker.db").resolve()

print("Database Path :", db_path);

Database_URL = f'sqlite:///{db_path}'

engine = create_engine(Database_URL)