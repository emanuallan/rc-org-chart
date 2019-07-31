import { NEW_VTC, FETCH_VTCS, DELETE_VTC, EDIT_VTC, SELECT_VTC } from '../actions/types';

const initialState = {
    vtcs: [],
    vtc: {},
    sel_vtc: {},
    action_type: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
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