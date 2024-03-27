import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://127.0.0.1:5000/todos");
    const data = await response.json();
    setTodos(data);
  }

  const addTodo = async () => {
    await fetch("http://127.0.0.1:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchTodos(); // Fetch todos again to update the list.
      })
      .catch(error => console.error("Error:", error));
    setNewTodo("");
  }

  const updateTodo = async (id, completed) => {
    await fetch(`http://127.0.0.1:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  }

  const deleteTodo = async (id) => {
    await fetch(`http://127.0.0.1:5000/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
        ></input>
        <button onClick={addTodo}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
              <button onClick={() => updateTodo(todo.id, todo.completed)}>Toggle Complete</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
