import IAction from './interfaces/IAction';
import IDispatcher from './interfaces/IDispatcher';
import IEventEmitter from './interfaces/IEventEmitter';
import IReducer from './interfaces/IReducer';

export default class Store<T> {
  protected store: T[];

  constructor(defaultSore: T[], reducer: IReducer<T>, dispatcher: IDispatcher<T>, emitter: IEventEmitter<T>) {
    this.store = defaultSore;

    dispatcher.register((action: IAction<T>) => {
      this.store = reducer(this.store, action);
      emitter.trigger(action.type, [...this.store]);
    });
  }

  public getStore() {
    return [...this.store];
  }
}
