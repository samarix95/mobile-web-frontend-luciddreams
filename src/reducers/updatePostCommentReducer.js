import { SET_UPDATE_POST_COMMENT_PENDING, SET_UPDATE_POST_COMMENT_DATA, SET_UPDATE_POST_COMMENT_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function updatePostCommentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_UPDATE_POST_COMMENT_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_UPDATE_POST_COMMENT_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_UPDATE_POST_COMMENT_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getUpdatePostCommentPending = state => state.updatePostComment.pending;
export const getUpdatePostCommentData = state => state.updatePostComment.data;