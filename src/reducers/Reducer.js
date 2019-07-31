import { FETCH_CONTAINER_TYPE, NEW_CONTAINER, FETCH_CONTAINERS, DELETE_CONTAINER, EDIT_CONTAINER, UPDATE_CONTAINER, SELECT_CONTAINER, NEW_VTC, FETCH_VTCS, DELETE_VTC, EDIT_VTC, UPDATE_VTC, SELECT_VTC } from '../actions/types';

const initialState = {
    vtcs: [],
    vtc: {},
    sel_vtc: {},

    containers: [],
    container: {},
    sel_container: {},
    containers_type: [],

    action_type: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_CONTAINER:
            return {
                ...state,
                container: action.payload,
                action_type: action.type
            };
        case FETCH_CONTAINERS:
            return {
                ...state,
                containers: action.payload,
                action_type: action.type
            };
        case FETCH_CONTAINER_TYPE:
            return {
                ...state,
                containers_type: action.payload,
                action_type: action.type
            };
        case DELETE_CONTAINER:
            return {
                ...state,
                container: action.payload,
                action_type: action.type
            };
        case EDIT_CONTAINER:
            return {
                ...state,
                container: action.payload,
                action_type: action.type
            };
        case UPDATE_CONTAINER:
            return {
                ...state,
                container: action.payload,
                action_type: action.type
            };
        case SELECT_CONTAINER:
            return {
                ...state,
                sel_container: action.payload,
                action_type: action.type
            };



        case NEW_VTC:
            return {
                ...state,
                vtc: action.payload,
                action_type: action.type
            };
        case FETCH_VTCS:
            return {
                ...state,
                vtcs: action.payload,
                action_type: action.type
            };
        case DELETE_VTC:
            return {
                ...state,
                vtc: action.payload,
                action_type: action.type
            };
        case EDIT_VTC:
            return {
                ...state,
                vtc: action.payload,
                action_type: action.type
            };
        case UPDATE_VTC:
            return {
                ...state,
                vtc: action.payload,
                action_type: action.type
            };
        case SELECT_VTC:
            return {
                ...state,
                sel_vtc: action.payload,
                action_type: action.type
            };
        default:
            return state;
    }
}