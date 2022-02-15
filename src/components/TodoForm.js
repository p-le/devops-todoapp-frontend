import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [title, setTitle] = useState(props.edit ? props.edit.title : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      status: true,
      title: title
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={title}
            onChange={handleChange}
            name='title'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Coding...'
            value={title}
            onChange={handleChange}
            name='title'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
