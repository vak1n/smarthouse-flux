import { IAction } from '../index';
import { ITodo } from './Todo';

export class TodoAction {
  public static readonly ADD: string = '[TODO] ADD';
  public static readonly DELETE: string = '[TODO] DELETE';
  public static readonly COMPLETE: string = '[TODO] COMPLETE';

  public static add(todo: ITodo): IAction<ITodo> {
    return {
      payload: todo,
      type: this.ADD,
    };
  }

  public static delete(todo: ITodo): IAction<ITodo> {
    return {
      payload: todo,
      type: this.DELETE,
    };
  }

  public static complete(todo: ITodo): IAction<ITodo> {
    return {
      payload: todo,
      type: this.COMPLETE,
    };
  }
}
