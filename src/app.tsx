import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import todoStore from './store';

const App: React.FC = () => {
  const snapshot = useSnapshot(todoStore);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      todoStore.addTodo(newTodo);
      setNewTodo('');
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
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => todoStore.toggleTodo(todo.id)} 
            />
            {todo.text}
            <button onClick={() => todoStore.removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;