export default interface IEventEmitter<T> {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string, data: T): void;
}
