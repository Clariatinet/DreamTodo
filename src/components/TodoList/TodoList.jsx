import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import styles from './TodoList.module.css';
import Todo from '../Todo/Todo';

const TodoList = ({ filter }) => {
  const [todos, setTodos] = useState(readTodosFromLocalStorage);
  const handleAdd = (todo) => {
    // 새로운 todo를 todos에 업데이트 해야한다.
    setTodos([...todos, todo]);
  };
  const handleUpdate = (updated) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === updated.id) {
          return updated;
        } else {
          return todo;
        }
      })
    );
  };
  const handleDelete = (deleted) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== deleted.id;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const getFilterItems = (todos, filter) => {
    if (filter === 'all') {
      return todos;
    } else {
      return todos.filter((todo) => {
        return todo.status === filter;
      });
    }
  };
  const filtered = getFilterItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          );
        })}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
};

export default TodoList;

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
