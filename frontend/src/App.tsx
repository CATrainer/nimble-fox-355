import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const API_BASE = 'http://localhost:8000';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    if (!newTodo.title.trim()) return;
    
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const todo = await response.json();
      setTodos([...todos, todo]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTodo({ title: todo.title, description: todo.description || '' });
  };

  const saveEdit = async () => {
    if (!editingId || !editingTodo.title.trim()) return;
    
    await updateTodo(editingId, editingTodo);
    setEditingId(null);
    setEditingTodo({ title: '', description: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTodo({ title: '', description: '' });
  };

  const toggleComplete = async (todo: Todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      
      <div className="add-todo">
        <input
          type="text"
          placeholder="Todo title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>

      <div className="todos">
        {todos.map(todo => (
          <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <div className="edit-todo">
                <input
                  type="text"
                  value={editingTodo.title}
                  onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editingTodo.description}
                  onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="todo-content">
                <div className="todo-info">
                  <h3>{todo.title}</h3>
                  {todo.description && <p>{todo.description}</p>}
                </div>
                <div className="todo-actions">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                  />
                  <button onClick={() => startEditing(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;