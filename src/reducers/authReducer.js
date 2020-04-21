import { SET_USER_DATA, SET_USER_LOADING, RESET_USER_DATA } from "../actions/types";

const initialState = {
    isAuth: false,
    pending: false,
    data: {}
};

export function authDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: true,
                pending: false,
                data: action.data
            };
        case SET_USER_LOADING:
            return {
                ...state,
                isAuth: false,
                pending: true
            };
        case RESET_USER_DATA:
            return {
                ...state,
                isAuth: false,
                pending: false,
                data: {}
            };
        default:
            return state;
    }
}

export const getAuth = state => state.authData.isAuth;
export const getAuthPending = state => state.authData.pending;
export const getAuthData = state => state.authData.data;