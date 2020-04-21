import { SET_POST_COMMENTS_PENDING, SET_POST_COMMENTS_DATA, SET_POST_COMMENTS_ERROR, CLEAR_POST_COMMENTS } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function postCommentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POST_COMMENTS_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_POST_COMMENTS_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_POST_COMMENTS_ERROR:
            return {
                ...state,
                pending: false
            };
        case CLEAR_POST_COMMENTS:
            return {
                ...state,
                pending: false,
                data: {}
            };
        default:
            return state;
    }
}

export const getPostCommentsPending = state => state.postComments.pending;
export const getPostCommentsData = state => state.postComments.data;