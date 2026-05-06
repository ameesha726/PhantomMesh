import time
import hashlib
import requests
from playwright.sync_api import sync_playwright

last_hash = None

# -----------------------------------
# Generate hash
# -----------------------------------
def make_hash(state):

    return hashlib.md5(
        str(state).encode()
    ).hexdigest()

# -----------------------------------
# Observer Loop
# -----------------------------------
def run():

    global last_hash

    with sync_playwright() as p:

        browser = p.chromium.launch(headless=False)

        page = browser.new_page()

        page.goto("http://localhost:8002")

        while True:

            # -----------------------------------
            # Read Department B UI
            # -----------------------------------
            state = {
                "ubid": page.input_value("#ubid"),
                "business_name": page.input_value("#business_name"),
                "address": page.input_value("#address"),
                "status": page.input_value("#status"),
                "signatory": page.input_value("#signatory")
            }

            current_hash = make_hash(state)

            # -----------------------------------
            # Initial load
            # -----------------------------------
            if last_hash is None:

                last_hash = current_hash

            # -----------------------------------
            # Detect change
            # -----------------------------------
            elif current_hash != last_hash:

                last_hash = current_hash

                print("\n============================")
                print("Detected Change")
                print(state)
                print("============================")

                try:

                    requests.post(
                        "http://localhost:8003/event",
                        json={
                            **state,
                            "source": "dept_b"
                        }
                    )

                except Exception as ex:

                    print("Sync Error:", ex)

            time.sleep(2)

# -----------------------------------
# Start Observer
# -----------------------------------
if __name__ == "__main__":

    run()