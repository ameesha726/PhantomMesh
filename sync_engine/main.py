from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import requests
import hashlib
from datetime import datetime
from playwright.sync_api import sync_playwright
import time

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

seen = set()
audit = []

# -----------------------------------
# Prevent observer loop
# -----------------------------------
SYSTEM_UPDATING = False

# -----------------------------------
# Generate hash
# -----------------------------------
def make_hash(data):

    return hashlib.md5(
        str(data).encode()
    ).hexdigest()

# -----------------------------------
# Update Department B UI
# -----------------------------------
def update_dept_b(data):

    global SYSTEM_UPDATING

    SYSTEM_UPDATING = True

    try:

        with sync_playwright() as p:

            browser = p.chromium.launch(headless=False)

            page = browser.new_page()

            page.goto("http://localhost:8002")

            page.fill("#business_name", data["business_name"])
            page.fill("#address", data["address"])
            page.select_option("#status", data["status"])
            page.fill("#signatory", data["signatory"])

            page.click("text=Save")

            print("Updated Department B UI")

            browser.close()

        time.sleep(2)

    finally:

        SYSTEM_UPDATING = False

# -----------------------------------
# Main Event Handler
# -----------------------------------
@app.post("/event")
def event(e: dict):

    global SYSTEM_UPDATING

    source = e["source"]

    # -----------------------------------
    # Prevent infinite loop
    # -----------------------------------
    if SYSTEM_UPDATING and source == "dept_b":
        return {
            "status": "ignored-system-update"
        }

    # -----------------------------------
    # Create hash for idempotency
    # -----------------------------------
    hash_val = make_hash(e)

    if hash_val in seen:
        return {
            "status": "duplicate"
        }

    seen.add(hash_val)

    # -----------------------------------
    # Extract fields
    # -----------------------------------
    ubid = e["ubid"]
    business_name = e["business_name"]
    address = e["address"]
    status = e["status"]
    signatory = e["signatory"]

    # -----------------------------------
    # Audit Log
    # -----------------------------------
    audit.append({
        "ubid": ubid,
        "business_name": business_name,
        "address": address,
        "status": status,
        "signatory": signatory,
        "source": source,
        "time": datetime.utcnow().isoformat()
    })

    print("\n============================")
    print("Received Event")
    print(e)
    print("============================")

    # -----------------------------------
    # Sync to SWS
    # -----------------------------------
    if source != "sws":

        requests.post(
            "http://localhost:8000/update",
            json={
                "ubid": ubid,
                "business_name": business_name,
                "address": address,
                "status": status,
                "signatory": signatory
            }
        )

        print("Synced -> SWS")

    # -----------------------------------
    # Sync to Department A
    # -----------------------------------
    if source != "dept_a":

        requests.post(
            "http://localhost:8001/update",
            json={
                "business_id": ubid,
                "company_name": business_name,
                "location": address,
                "approval_state": status,
                "authorized_person": signatory
            }
        )

        print("Synced -> Department A")

    # -----------------------------------
    # Sync to Department B UI
    # -----------------------------------
    if source != "dept_b":

        update_dept_b({
            "business_name": business_name,
            "address": address,
            "status": status,
            "signatory": signatory
        })

        print("Synced -> Department B")

    return {
        "status": "success",
        "event": e
    }

# -----------------------------------
# Audit Endpoint
# -----------------------------------
@app.get("/audit")
def get_audit():
    return audit