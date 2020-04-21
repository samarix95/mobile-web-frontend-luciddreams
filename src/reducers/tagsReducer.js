import { SET_TAGS_PENDING, SET_TAGS_DATA, SET_TAGS_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TAGS_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_TAGS_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_TAGS_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getTagsPending = state => state.tags.pending;
export const getTagsData = state => state.tags.data;