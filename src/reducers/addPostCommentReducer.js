import { SET_ADD_POST_COMMENT_PENDING, SET_ADD_POST_COMMENT_DATA, SET_ADD_POST_COMMENT_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function addPostCommentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADD_POST_COMMENT_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_ADD_POST_COMMENT_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_ADD_POST_COMMENT_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getAddPostCommentPending = state => state.addPostComment.pending;
export const getAddPostCommentData = state => state.addPostComment.data;