import { LOGIN } from '../actions/types';

const initialState = {
    isadmin: null,
    privilege: "",
    session_token: "",
    user_name: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isadmin: action.payload.is_admin,
                privilege: action.payload.privilege,
                session_token: action.payload.session_token,
                user_name: action.payload.user_name
            };
        default:
            return state;
    }
}