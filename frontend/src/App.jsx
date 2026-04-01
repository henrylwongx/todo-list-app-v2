import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = (newTodo) => {
    setTodos(prev => [...prev, newTodo]);
  };

  // Toggle todo completion
  const handleToggleTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }
      const updatedTodo = await response.json();
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Error toggling todo:', err);
      alert('Failed to toggle todo');
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      alert('Failed to delete todo');
    }
  };

  if (loading) return <p className="loading">Loading todos...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList 
        todos={todos} 
        onToggleTodo={handleToggleTodo} 
        onDeleteTodo={handleDeleteTodo} 
      />
    </div>
  );
};

export default App;