import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import todoStore from './store';

const App: React.FC = () => {
  const snapshot = useSnapshot(todoStore);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      todoStore.addTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleEditTodo = (id: number, currentText: string) => {
    setEditingTodoId(id);
    setEditingText(currentText);
  };

  const handleSaveEdit = () => {
    if (editingTodoId !== null && editingText.trim()) {
      todoStore.editTodo(editingTodoId, editingText);
      setEditingTodoId(null);
      setEditingText('');
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a new to-do"
      />
      <button onClick={handleAddTodo}>Add</button>
      
      <ul>
        {snapshot.todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingTodoId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => todoStore.toggleTodo(todo.id)} 
                />
                {todo.text}
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                <button onClick={() => todoStore.removeTodo(todo.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;