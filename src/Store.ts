import IAction from './interfaces/IAction';
import IReducer from './interfaces/IReducer';

export default class Store {
  protected state: { [key: string]: any[] };
  protected reducers: { [key: string]: IReducer<any> };
  protected subscribers: Array<((state: { [key: string]: any[] }) => void)>;

  constructor() {
    this.subscribers = [];
    this.reducers = {};
    this.state = {};
  }

  public addReducer<T>(key: string, reducer: IReducer<T>) {
    this.reducers[key] = reducer;
    this.state = this.reduce({}, { type: '' });
  }

  get value() {
    return this.state;
  }

  public subscribe(fn: () => void) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  public dispatch<T>(action: IAction<T>) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  protected notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  protected reduce<T>(state: { [key: string]: any[] }, action: IAction<T>) {
    const newState: { [key: string]: object[] } = {};
    Object.keys(this.reducers).forEach((key) => {
      newState[key] = this.reducers[key](state[key], action);
    });
    return newState;
  }
}
