import IAction from './IAction';

export default interface IDispatcher<T> {
  register(callback: (action: IAction<T>) => void): void;
  dispatch(action: IAction<T>): void;
}
