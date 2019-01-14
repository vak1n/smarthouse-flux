import React, { ChangeEvent } from 'react';

import Dispatcher from '../src/Dispatcher';
import EventEmitter from '../src/EventEmitter';
import Store from '../src/Store';
import { TodoAction } from './TodoAction';
import TodoList from './TodoList';
import { todoReducer } from './todoReducer';

export interface ITodo {
  id: string;
  label: string;
  complete: boolean;
}

const todos: ITodo[] = [
  {
    complete: true,
    id: Math.random()
      .toString(36)
      .substr(2),
    label: 'Create lib',
  },
  {
    complete: false,
    id: Math.random()
      .toString(36)
      .substr(2),
    label: 'Create app',
  },
];
const eventEmitter = new EventEmitter<ITodo>();
const dispatcher = new Dispatcher<ITodo>();
const store = new Store<ITodo>(todos, todoReducer, dispatcher, eventEmitter);

export interface ITodoState {
  list: ITodo[];
  todo: ITodo;
}

export class Todo extends React.PureComponent<{}, ITodoState> {
  constructor(props: {}) {
    super(props);
    this.handlerAddTodo = this.handlerAddTodo.bind(this);
    this.handlerChangeTodoLabel = this.handlerChangeTodoLabel.bind(this);
    this.handlerTodoComplete = this.handlerTodoComplete.bind(this);
    this.handlerTodoDelete = this.handlerTodoDelete.bind(this);
    this.state = {
      list: [],
      todo: {
        complete: false,
        id: '',
        label: '',
      },
    };
  }

  public componentDidMount() {
    this.setState({ list: store.getStore() });
    [TodoAction.ADD, TodoAction.COMPLETE, TodoAction.DELETE].forEach((action) => {
      eventEmitter.on(action, () => {
        this.setState(() => {
          return {
            list: store.getStore(),
          };
        });
      });
    });
  }

  public handlerAddTodo() {
    if (!this.state.todo.label) {
      return;
    }
    dispatcher.dispatch(TodoAction.add(this.state.todo));
    this.setState(() => {
      return {
        todo: {
          complete: false,
          id: '',
          label: '',
        },
      };
    });
  }

  public handlerChangeTodoLabel(event: ChangeEvent<HTMLInputElement>) {
    const label = event.target.value;
    this.setState(() => {
      return {
        todo: {
          complete: false,
          id: Math.random()
            .toString(36)
            .substr(2),
          label,
        },
      };
    });
  }

  public handlerTodoComplete(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.dataset.id) {
      return;
    }
    const findTodo = this.state.list.find((todo) => todo.id === event.target.dataset.id);
    if (findTodo) {
      dispatcher.dispatch(TodoAction.complete(findTodo));
    }
  }

  public handlerTodoDelete(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.dataset.id) {
      return;
    }
    const findTodo = this.state.list.find((todo) => todo.id === event.target.dataset.id);
    if (findTodo) {
      dispatcher.dispatch(TodoAction.delete(findTodo));
    }
  }

  public render() {
    return (
      <div className="Todo">
        <p className="Todo-Title">You have todos</p>
        <TodoList
          list={this.state.list}
          handlerComplete={this.handlerTodoComplete}
          handlerDelete={this.handlerTodoDelete}
        />
        <input
          className="Todo-Input"
          type="text"
          value={this.state.todo.label}
          onChange={this.handlerChangeTodoLabel}
        />
        <button className="Todo-Button Todo-Button_add" type="button" onClick={this.handlerAddTodo}>
          Add todo
        </button>
      </div>
    );
  }
}
