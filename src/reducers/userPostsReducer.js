import { SET_USER_POSTS_PENDING, SET_USER_POSTS_DATA, SET_USER_POSTS_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function userPostsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_POSTS_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_USER_POSTS_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_USER_POSTS_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getUserPostsPending = state => state.userPosts.pending;
export const getUserPostsData = state => state.userPosts.data;