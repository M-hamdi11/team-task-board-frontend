# Team Task Board: Frontend

A responsive Kanban task board built with React, Vite and Tailwind CSS.

- **Live demo:** https://team-task-board-frontend.vercel.app/
- **Live API:** https://team-task-board-backend.vercel.app/tasks
- **Backend repo:** https://github.com/M-hamdi11/team-task-board-backend

## Features

- Three columns: To do, In progress, Done
- Create, edit, delete and move tasks
- Each task has a title, description, assignee and due date
- Overdue tasks are highlighted (not shown as overdue once Done)
- Search by title and filter by assignee
- Data persisted in MongoDB through the backend API
- Light / dark mode
- Mobile-friendly layout

## Tech stack

React, Vite, Tailwind CSS v4, Axios

## Getting started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` (Windows: `copy .env.example .env`) and set `VITE_API_URL`:
   - **Deployed API:** `VITE_API_URL=https://team-task-board-backend.vercel.app`
   - **Local backend:** leave it empty. Requests to `/tasks` are proxied to `http://localhost:3000` via `vite.config.js`, so start the backend first (see the backend repo).

3. Run the app:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Project structure

```
src/
  components/   Header, Column, TaskCard, TaskForm
  hooks/        useTasks (state + API calls)
  utils/        date helpers
  App.jsx
```