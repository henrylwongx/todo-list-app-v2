# Todo List Application

## Project Description
A simple Todo List application with a FastAPI backend and React/Vite frontend. The backend provides CRUD operations for todos (in-memory storage). The frontend allows users to add, toggle completion, and delete todos.

## Architecture Decisions
- **Backend**: FastAPI chosen for its simplicity and automatic API documentation. In-memory storage (list) is sufficient for demo.
- **Frontend**: React with Vite for fast development and modern tooling. Uses proxy to avoid CORS issues during development.
- **Communication**: Frontend proxies `/api` requests to backend running on port 8000.
- **State Management**: Frontend uses React state (useState) for simplicity.

## File Structure
```
/home/ubuntu/demo-workspace/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.js
│       └── components/
│           ├── TodoForm.jsx
│           └── TodoList.jsx
├── PLAN.md
└── CONTRACT.md
```

## Backend Endpoints
- `GET /api/todos` - Returns list of all todos
- `POST /api/todos` - Creates a new todo (title required)
- `DELETE /api/todos/{id}` - Deletes todo by id
- `PATCH /api/todos/{id}` - Toggles completion status of todo

Each todo object: `{ "id": int, "title": string, "completed": boolean }`

## Frontend Components
- `App.jsx`: Main component that manages state and renders UI
- `TodoForm.jsx`: Input field and button to add new todos
- `TodoList.jsx`: List of todos with checkbox (toggle) and delete button per item

## QA Checklist
- [ ] Backend returns correct status codes (200, 201, 404)
- [ ] Frontend displays todos from backend
- [ ] Adding a todo updates list without refresh
- [ ] Checkbox toggles completed state
- [ ] Delete button removes todo
- [ ] Error handling for missing todo (404)
- [ ] Frontend proxy works (no CORS errors in dev)