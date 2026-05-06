from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import requests

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

SYNC_ENGINE = "http://localhost:8003/event"

# -----------------------------------
# Model
# -----------------------------------
class Update(BaseModel):
    ubid: str
    business_name: str
    address: str
    status: str
    signatory: str

# -----------------------------------
# Home
# -----------------------------------
@app.get("/")
def home():
    return {
        "message": "PhantomMesh SWS Running"
    }

# -----------------------------------
# Get Business
# -----------------------------------
@app.get("/business/{ubid}")
def get_business(ubid: str):
    return db.get(ubid, {})

# -----------------------------------
# Internal Sync
# -----------------------------------
@app.post("/update")
def update(data: Update):

    db[data.ubid] = {
        "business_name": data.business_name,
        "address": data.address,
        "status": data.status,
        "signatory": data.signatory,
        "updated_at": datetime.utcnow().isoformat(),
        "source": "sws"
    }

    return {
        "status": "updated",
        "data": db[data.ubid]
    }

# -----------------------------------
# User Update
# -----------------------------------
@app.post("/user-update")
def user_update(data: Update):

    db[data.ubid] = {
        "business_name": data.business_name,
        "address": data.address,
        "status": data.status,
        "signatory": data.signatory,
        "updated_at": datetime.utcnow().isoformat(),
        "source": "sws"
    }

    requests.post(
        SYNC_ENGINE,
        json={
            "ubid": data.ubid,
            "business_name": data.business_name,
            "address": data.address,
            "status": data.status,
            "signatory": data.signatory,
            "source": "sws"
        }
    )

    return {
        "status": "user update propagated",
        "data": db[data.ubid]
    }