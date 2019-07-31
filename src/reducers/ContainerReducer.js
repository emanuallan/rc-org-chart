import { FETCH_CONTAINER_TYPE, NEW_CONTAINER, FETCH_CONTAINERS, DELETE_CONTAINER, EDIT_CONTAINER, SELECT_CONTAINER } from '../actions/types';

const initialState = {
    containers: [],
    container: {},
    sel_container: {},
    containers_type: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_CONTAINER:
            return {
                ...state,
                container: action.payload
            };
        case FETCH_CONTAINERS:
            return {
                ...state,
                containers: action.payload
            };
        case FETCH_CONTAINER_TYPE:
            return {
                ...state,
                containers_type: action.payload
            };
        case DELETE_CONTAINER:
            return {
                ...state,
                container: action.payload
            };
        case EDIT_CONTAINER:
            return {
                ...state,
                container: action.payload
            };
        case SELECT_CONTAINER:
            return {
                ...state,
                sel_container: action.payload
            };
        default:
            return state;
    }
}