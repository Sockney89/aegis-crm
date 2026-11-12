# Aegis CRM

A showcase project for the [Aegis](https://github.com/Sockney89/aegis-dist) programming language. Aegis CRM is a small full-stack CRM application: an Aegis HTTP backend with SQLite persistence and a Vue 3 frontend, organized as a monorepo.

Aegis is a deliberately tiny, systems-oriented language (stack-by-default memory, errors as values, design-by-contract, actor-style events). This project demonstrates using Aegis's standard library (HTTP, JSON, auth helpers, hashing) plus its C FFI to build a real API server.

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
aegis backend/src/main.aegis backend/src/sqlite_helper.c backend/vendor/sqlite3.c \
  --main App::main --emit-exe backend/build/crm.exe
```

Run:

```sh
npm run dev:backend
# or: backend/build/crm.exe
```

The API listens on `http://127.0.0.1:8080` (override with `CRM_PORT`). Data is stored in `crm.db` (SQLite) in the working directory. Ensure the backend is running before the frontend; the frontend points at `http://127.0.0.1:8080` (override with `VITE_API_URL`).

## Frontend

```sh
npm run build:frontend   # build
npm --workspace frontend run dev   # dev server on http://localhost:5173
```

The frontend expects the backend at `http://127.0.0.1:8080` (override with `VITE_API_URL`).

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
- Export: `GET /export/contacts`
- `GET /stats`, `GET /health`

All protected routes require `Authorization: Bearer <token>`.
