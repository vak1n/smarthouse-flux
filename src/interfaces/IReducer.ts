import IAction from './IAction';

type IReducer = (state: object, action: IAction) => object;

export default IReducer;