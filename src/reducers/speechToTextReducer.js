import { SET_STT_PENDING, SET_STT_DATA, RESET_STT_DATA, SET_STT_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function speechToTextReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STT_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_STT_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case RESET_STT_DATA:
            return {
                ...state,
                pending: false,
                data: {}
            };
        case SET_STT_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getSTTPending = state => state.speechToText.pending;
export const getSTTData = state => state.speechToText.data;