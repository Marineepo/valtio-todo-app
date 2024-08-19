import { proxy } from 'valtio';

// To understand the code below and how it works, please reference to the store.txt file in the same directory.
// There is a break down of each function and how it works.

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const todoStore = proxy<TodoStore>({
  todos: [],
  
  addTodo: (text: string) => {
    todoStore.todos.push({
      id: Date.now(),
      text,
      completed: false,
    });
  },
  
  toggleTodo: (id: number) => {
    const todo = todoStore.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },

  editTodo: (id: number, newText: string) => {
    const todo = todoStore.todos.find(todo => todo.id === id);
    if (todo) {
      todo.text = newText;
    }
  },
  
  removeTodo: (id: number) => {
    todoStore.todos = todoStore.todos.filter(todo => todo.id !== id);
  }
});

export default todoStore;