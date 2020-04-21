import { SET_DELETE_POST_PENDING, SET_DELETE_POST_DATA, SET_DELETE_POST_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function deletePostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DELETE_POST_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_DELETE_POST_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_DELETE_POST_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getDeletePostPending = state => state.deletePost.pending;
export const getDeletePostData = state => state.deletePost.data;