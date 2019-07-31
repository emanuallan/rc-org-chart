import { combineReducers } from 'redux';
import VTC_Reducer from './VTC_Reducer';
import LoginReducer from './LoginReducer';
import ContainerReducer from './ContainerReducer';
import Reducer from './Reducer';

export default combineReducers({
    vtcs: VTC_Reducer,
    containers: ContainerReducer,
    login: LoginReducer,
    nodes: Reducer
});