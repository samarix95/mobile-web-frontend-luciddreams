import { SET_SEARCH_ICON_PENDING, SET_SEARCH_ICON_DATA, SET_SEARCH_ICON_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function searchIconReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_ICON_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_SEARCH_ICON_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_SEARCH_ICON_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getSearchIconPending = state => state.searchIcon.pending;
export const getSearchIconData = state => state.searchIcon.data;