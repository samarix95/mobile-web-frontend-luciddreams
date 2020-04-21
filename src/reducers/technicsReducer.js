import { SET_TECHNICS_PENDING, SET_TECHNICS_DATA, SET_TECHNICS_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function technicsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TECHNICS_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_TECHNICS_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_TECHNICS_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getTechnicsPending = state => state.technics.pending;
export const getTechnicsData = state => state.technics.data;