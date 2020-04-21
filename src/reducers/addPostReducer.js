import { SET_ADD_POST_PENDING, SET_ADD_POST_DATA, SET_ADD_POST_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function addPostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADD_POST_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_ADD_POST_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_ADD_POST_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getAddPostPending = state => state.addPost.pending;
export const getAddPostData = state => state.addPost.data;