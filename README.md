# Team Task Board: Frontend

A responsive Kanban task board built with React, Vite and Tailwind CSS.

**Backend repo:** https://github.com/M-hamdi11/team-task-board-backend.git

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

1. Start the backend first (see the backend repo).
2. Then:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Requests to `/api` are proxied to the backend (`http://localhost:3000`) via `vite.config.js`.

## Project structure

```
src/
  components/   Header, Column, TaskCard, TaskForm
  hooks/        useTasks (state + API calls)
  utils/        date helpers
  App.jsx
```
