from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# In-memory storage
todos: List[dict] = []
next_id = 1

class TodoCreate(BaseModel):
    title: str

class Todo(TodoCreate):
    id: int
    completed: bool = False

@app.get("/api/todos", response_model=List[Todo])
def get_todos():
    return todos

@app.post("/api/todos", response_model=Todo, status_code=201)
def create_todo(todo: TodoCreate):
    global next_id
    new_todo = {
        "id": next_id,
        "title": todo.title,
        "completed": False
    }
    todos.append(new_todo)
    next_id += 1
    return new_todo

@app.delete("/api/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int):
    global todos
    for index, todo in enumerate(todos):
        if todo["id"] == todo_id:
            todos.pop(index)
            return
    raise HTTPException(status_code=404, detail="Todo not found")

@app.patch("/api/todos/{todo_id}", response_model=Todo)
def toggle_todo(todo_id: int):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["completed"] = not todo["completed"]
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")