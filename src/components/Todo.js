import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillEdit } from 'react-icons/ai';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    title: ''
  });


  const submitUpdate = formValue => {
    updateTodo(edit.id, formValue);
    setEdit({
      id: null,
      title: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.status ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.title}
      </div>
      <div className='icons'>
        <AiFillCloseCircle
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <AiFillEdit
          onClick={() => setEdit({ id: todo.id, title: todo.title })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
