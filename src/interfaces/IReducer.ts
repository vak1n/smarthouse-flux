import IAction from './IAction';

type IReducer<T> = (state: T[], action: IAction<T>) => T[];

export default IReducer;