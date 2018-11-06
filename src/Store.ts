import IAction from './interfaces/IAction';
import IReducer from './interfaces/IReducer';

export default class Store {
  private state: { [key: string]: object };
  private reducers: { [key: string]: IReducer };
  private subscribers: Array<((state: { [key: string]: object }) => void)>;

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {type: ''});
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

  public dispatch(action: IAction) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state: { [key: string]: object }, action: IAction) {
    const newState: { [key: string]: object } = {};
    Object.keys(this.reducers).forEach((prop) => {
      newState[prop] = this.reducers[prop](state[prop], action);
    });
    return newState;
  }
}
