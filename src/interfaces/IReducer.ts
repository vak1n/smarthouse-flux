import IAction from './IAction';

type IReducer<T> = (store: T[], action: IAction<T>) => T[];

export default IReducer;
