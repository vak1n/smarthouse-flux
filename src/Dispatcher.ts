import IAction from './interfaces/IAction';
import IDispatcher from './interfaces/IDispatcher';

export default class Dispatcher<T> implements IDispatcher<T> {
  protected callbacks: Array<(action: IAction<T>) => void>;

  constructor() {
    this.callbacks = [];
  }

  public register(callback: (action: IAction<T>) => void) {
    this.callbacks.push(callback);
  }

  public dispatch(action: IAction<T>) {
    this.callbacks.forEach((callback) => {
      callback(action);
    });
  }
}
