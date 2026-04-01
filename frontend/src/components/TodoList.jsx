import React from 'react';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
            className="todo-checkbox"
          />
          <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="delete-button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;