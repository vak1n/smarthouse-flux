import React, { ChangeEvent } from 'react';

import './TodoList.css';

import { ITodo } from './Todo';

interface ITodoListProps {
  list: ITodo[];
  handlerComplete: (event: ChangeEvent<HTMLInputElement>) => void;
  handlerDelete: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoList = (props: ITodoListProps) => {
  const list = props.list.map((todo) => (
    <li className="TodoList-Item" key={todo.id}>
      <input
        className="TodoList-Complete"
        id={`complete_${todo.id}`}
        data-id={todo.id}
        type="checkbox"
        onChange={props.handlerComplete}
        name={'complete'}
        value={'yes'}
        checked={todo.complete}
      />
      <label className="TodoList-Label" htmlFor={`complete_${todo.id}`}>
        {todo.label}
      </label>
      <input
        className="TodoList-Delete"
        data-id={todo.id}
        id={`delete_${todo.id}`}
        type="checkbox"
        onChange={props.handlerDelete}
        name={'delete'}
        value={'yes'}
      />
      <label className="TodoList-DeleteLabel" htmlFor={`delete_${todo.id}`}>
        &#10008;
      </label>
    </li>
  ));

  return <ul className="TodoList">{list}</ul>;
};

export default TodoList;
