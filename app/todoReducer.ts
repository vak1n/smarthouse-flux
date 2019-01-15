import { IAction, IReducer } from '../index';
import { ITodo } from './Todo';
import { TodoAction } from './TodoAction';

const initialState: ITodo[] = [];

export const todoReducer: IReducer<ITodo> = (state = initialState, action: IAction<ITodo>) => {
  switch (action.type) {
    case TodoAction.ADD: {
      if (!action.payload) {
        return [...state];
      }
      return [...state, action.payload];
    }

    case TodoAction.DELETE: {
      if (!action.payload) {
        return [...state];
      }

      const newState = state.filter((todo) => todo.id !== action.payload!.id);

      return [...newState];
    }

    case TodoAction.COMPLETE: {
      if (!action.payload) {
        return [...state];
      }

      const newState = state.map((todo) => {
        if (todo.id === action.payload!.id) {
          todo.complete = !todo.complete;
        }
        return todo;
      });

      return [...newState];
    }
  }

  return state;
};
