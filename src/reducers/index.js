import { combineReducers } from 'redux';
import VTC_Reducer from './VTC_Reducer';
import ContainerReducer from './ContainerReducer';
import Reducer from './Reducer';

export default combineReducers({
    vtcs: VTC_Reducer,
    containers: ContainerReducer,
    nodes: Reducer
});