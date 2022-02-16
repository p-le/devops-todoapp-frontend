import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = () => {
    fetch(`${API_ENDPOINT}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setTodos(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };

  const addTodo = todo => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    todo.status = false;
    fetch(`${API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then((response) => response.json())
    .then((addedTodo) => {
      const newTodos = [addedTodo, ...todos];
      setTodos(newTodos);
    })
  };

  const updateTodo = (todoId, updateTodo) => {
    if (!updateTodo.title || /^\s*$/.test(updateTodo.title)) {
      return;
    }
    for (const idx in todos) {
      if (todos[idx].id === todoId) {
        updateTodo.status = todos[idx].status;
      }
    }
    fetch(`${API_ENDPOINT}/tasks/${todoId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTodo)
    })
    .then((response) => response.json())
    .then((updatedTodo) => {
      setTodos(prevTodos => prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    });
  };

  const removeTodo = id => {
    fetch(`${API_ENDPOINT}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((removedTodo) => {
      const remainTodos = todos.filter(todo => todo.id !== removedTodo.id);
      setTodos(remainTodos);
    });
  };

  const completeTodo = id => {
    let updateTodo = null
    for (const idx in todos) {
      if (todos[idx].id === id) {
        updateTodo = todos[idx];
        updateTodo.status = !updateTodo.status
      }
    }
    if (!updateTodo) {
      return;
    }
    fetch(`${API_ENDPOINT}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTodo)
    })
    .then((response) => response.json())
    .then((updatedTodo) => {
      setTodos(prevTotos => prevTotos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>What are your tasks for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {isError && <div className='warning'>Error fetching data.</div>}
    </>
  );
}

export default TodoList;
