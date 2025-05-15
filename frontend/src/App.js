import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
    .then(res => setTodos(res.data));
  }, []);
  
  const addTodo = async () => {
    if (!text) return;
    const res = await axios.post('http://localhost:5000/api/todos', {text});
    setTodos([...todos, res.data]);
    setText('');
  };
  
  const toggleComplete = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };
  
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };
  
  return (
    <div style={{padding: 20}}>
      <h1>To-Dos:</h1>
      <input value = {text} onChange={e => setText(e.target.value)}/>
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{marginTop: 10}}>
            <span
            onClick={() => toggleComplete(todo._id)}
            style = {{
              textDecoration: todo.blnCompleted ? 'line-through' : '',
              cursor: 'pointer'
            }}
            >{todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style = {{marginLeft: 10}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;