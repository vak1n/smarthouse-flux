import IEventEmitter from './interfaces/IEventEmitter';

export default class EventEmitter<T> implements IEventEmitter<T> {
  protected listeners: { [key: string]: Array<(data: T[]) => void> };

  constructor() {
    this.listeners = {};
  }

  public on(eventName: string, callback: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  public trigger(eventName: string, data: T[]) {
    const listeners = this.listeners[eventName];
    if (listeners) {
      listeners.forEach((callback) => {
        callback(data);
      });
    }
  }
}
