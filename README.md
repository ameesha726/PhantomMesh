# PhantomMesh

> Observe Everything. Touch Nothing.

PhantomMesh is a zero-integration interoperability layer designed to synchronize legacy government systems without requiring APIs, database access, or modifications to existing software.

Instead of traditional integration, PhantomMesh uses UI observation, state extraction, and event-driven synchronization to enable real-time interoperability across disconnected systems.

---

# 🚀 Problem Statement

Government systems often operate independently:

- Single Window System (SWS)
- Department approval systems
- Legacy internal portals
- Air-gapped systems

Changes made in one system do not propagate to others, creating inconsistent business records and synchronization failures.

PhantomMesh solves this by introducing a non-invasive observability layer.

---

# 🧠 Core Idea

PhantomMesh behaves like a digital observer.

It:
- watches system interfaces
- detects meaningful changes
- converts them into structured events
- synchronizes updates across systems using UBID

No backend integration is required.

---

# 🏗️ Architecture

```text
                +-------------------+
                |       SWS         |
                |   (FastAPI API)   |
                +---------+---------+
                          |
                          v
                +-------------------+
                |    Sync Engine    |
                | Event + Audit Log |
                +----+---------+----+
                     |         |
                     v         v
         +----------------+   +-------------------+
         | Department A   |   | Department B UI   |
         | API-Based      |   | No API Available  |
         +----------------+   +---------+---------+
                                         |
                                         v
                               +-------------------+
                               | Observer Agent    |
                               | Playwright Agent  |
                               +-------------------+
```

---

# ✨ Features

## ✅ Bidirectional Synchronization
- SWS → Departments
- Departments → SWS

## ✅ No-API System Support
Observer agents monitor UI state directly.

## ✅ Schema Translation
Different systems use different schemas:
- `address → location`
- `status → approval_state`

## ✅ UBID-Based Reconciliation
UBID acts as universal business identifier.

## ✅ Audit Trail
Every synchronization event is logged.

## ✅ Idempotency Protection
Duplicate events are automatically ignored.

## ✅ Loop Prevention
Prevents recursive synchronization cycles.

---

# 🧪 Demo Workflow

## Scenario 1 — No API Department Update

1. User updates Department B UI
2. Observer Agent detects change
3. Sync Engine generates event
4. SWS and Department A update automatically

## Scenario 2 — SWS Update

1. User updates SWS
2. Sync Engine propagates changes
3. Department systems synchronize automatically

---

# 🛠️ Tech Stack

## Backend
- FastAPI
- Python

## Observer Layer
- Playwright

## Frontend Dashboard
- Next.js
- TypeScript
- TailwindCSS

---

# 📁 Project Structure

```text
phantommesh/
│
├── dashboard/       # Next.js dashboard
├── sws/             # Single Window System
├── dept_a/          # API-based department
├── dept_b_ui/       # No-API department UI
├── observer/        # Playwright observer
├── sync_engine/     # Synchronization layer
└── README.md
```

---

# ▶️ Running the Prototype

## 1️⃣ Start SWS
```bash
cd sws
uvicorn main:app --port 8000 --reload
```

## 2️⃣ Start Department A
```bash
cd dept_a
uvicorn main:app --port 8001 --reload
```

## 3️⃣ Start Department B UI
```bash
cd dept_b_ui
python -m http.server 8002
```

## 4️⃣ Start Sync Engine
```bash
cd sync_engine
uvicorn main:app --port 8003 --reload
```

## 5️⃣ Start Observer
```bash
cd observer
python observer.py
```

## 6️⃣ Start Dashboard
```bash
cd dashboard
npm install
npm run dev
```

---

# 🌍 Vision

PhantomMesh redefines interoperability by shifting from integration to observability.

It enables even closed and undocumented systems to participate in real-time workflows without rewriting or modifying existing software.

---

# 👥 Team

Team PhantomMesh
