# Aegis CRM

A friendly CRM playground built with [Aegis](https://github.com/Sockney89/aegis-dist), SQLite, and Vue. Keep track of people, companies, deals, tasks, tags, and the small follow-ups that usually get lost between meetings.

The project is also a hands-on tour of Aegis: typed deal lifecycles, contracts, JWT authentication, JSON/HTTP APIs, structured logging, SQLite through the C FFI, and mock workflow integrations. The mock email and webhook services are intentionally local, so the app is easy to run and explore without setting up third-party accounts.

## Repository layout

```
backend/   Aegis source + SQLite helper + vendored SQLite amalgamation
frontend/  Vue 3 + Vite + Tailwind CSS SPA
```

## Prerequisites

- Node.js 20+ and npm
- Aegis toolchain (see the [Aegis repo](https://github.com/Sockney89/aegis-dist) for install instructions)
- A C compiler (clang) reachable via `AEGIS_CC`

## Backend

Build (from repo root):

```sh
npm run build:backend
```

Or directly:

```sh
aegis backend/src/app.aegis backend/src/infra.aegis backend/src/db.aegis \
  backend/src/crm.aegis backend/src/workflow.aegis backend/src/main.aegis \
  backend/src/sqlite_helper.c backend/vendor/sqlite3.c \
  --main App::main --emit-exe backend/build/crm.exe
```

Run:

```sh
npm run dev:backend
# or: backend/build/crm.exe
```

The API listens on `http://127.0.0.1:8080` by default. Set `CRM_PORT` if that port is already in use. SQLite stores data in `crm.db` in the process working directory.

## Frontend

```sh
npm run build:frontend   # build
npm --workspace frontend run dev   # dev server on http://localhost:5173
```

The frontend expects the backend at `http://127.0.0.1:8080`. Set `VITE_API_URL` when using another port.

## API overview

- Auth: `POST /auth/register`, `POST /auth/login`, `POST /auth/forgot`, `POST /auth/reset`, `GET /auth/me`
- Contacts: `/contacts`, `/contacts/{id}`, `POST /contacts/search`
- Companies: `/companies`, `/companies/{id}`
- Deals: `/deals`, `/deals/{id}`, `POST /deals/search`, `GET /deals/{id}/stages`
- Activities: `/activities`, `/activities/entity/{type}/{id}`
- Tasks: `/tasks`, `/tasks/{id}`
- Tags: `/tags`, `/tags/{id}`, `/entity-tags`, `GET /entity-tags/{type}/{id}`
- Attachments: `/attachments`, `/attachments/{id}`
- Audit: `GET /audit`
- Workflows: `GET /workflows`, `POST /deals/{id}/transition`
- Export: `GET /export/contacts`
- `GET /stats`, `GET /health`

Protected routes require `Authorization: Bearer <token>`. For a local setup, start the backend first and then start the frontend. If the browser has an old login token, sign in again after changing the backend build.

## What to explore

- Deal lifecycle state machine: `lead -> qualified -> proposal -> won/lost`
- Invalid deal transitions are rejected by the backend
- Deal creation and stage changes trigger mock email and webhook deliveries
- Mock delivery runs are persisted and visible at `/workflows`
- The frontend exposes a one-click deal transition control and workflow ledger

This is a deliberately small project, so the code is meant to be read and changed. Try adding a new deal transition, a workflow rule, or a new CRM entity and use the existing modules as a starting point.
