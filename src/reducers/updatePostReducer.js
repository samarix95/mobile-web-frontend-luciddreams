import { SET_UPDATE_POST_PENDING, SET_UPDATE_POST_DATA, SET_UPDATE_POST_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function updatePostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_UPDATE_POST_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_UPDATE_POST_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_UPDATE_POST_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getUpdatePostPending = state => state.updatePost.pending;
export const getUpdatePostData = state => state.updatePost.data;