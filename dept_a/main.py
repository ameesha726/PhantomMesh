from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

# -----------------------------------
# CORS
# -----------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = {}

# -----------------------------------
# Different Schema
# -----------------------------------
class Update(BaseModel):
    business_id: str
    company_name: str
    location: str
    approval_state: str
    authorized_person: str

# -----------------------------------
# Home
# -----------------------------------
@app.get("/")
def home():
    return {
        "message": "Department A Running"
    }

# -----------------------------------
# Get Record
# -----------------------------------
@app.get("/record/{bid}")
def get_record(bid: str):
    return db.get(bid, {})

# -----------------------------------
# Update
# -----------------------------------
@app.post("/update")
def update(data: Update):

    db[data.business_id] = {
        "company_name": data.company_name,
        "location": data.location,
        "approval_state": data.approval_state,
        "authorized_person": data.authorized_person,
        "updated_at": datetime.utcnow().isoformat(),
        "source": "dept_a"
    }

    return {
        "status": "updated",
        "data": db[data.business_id]
    }