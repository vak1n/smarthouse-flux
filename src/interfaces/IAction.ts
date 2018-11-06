export default interface IAction {
  readonly type: string;
  readonly payload?: object;
}