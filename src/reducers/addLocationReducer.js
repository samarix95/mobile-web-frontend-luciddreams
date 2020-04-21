import { SET_ADD_LOCATION_PENDING, SET_ADD_LOCATION_DATA, SET_ADD_LOCATION_ERROR } from "../actions/types";

const initialState = {
    pending: false,
    data: {}
};

export function addLocationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADD_LOCATION_PENDING:
            return {
                ...state,
                pending: true
            };
        case SET_ADD_LOCATION_DATA:
            return {
                ...state,
                pending: false,
                data: action.data
            };
        case SET_ADD_LOCATION_ERROR:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
}

export const getAddLocationPending = state => state.addLocation.pending;
export const getAddLocationData = state => state.addLocation.data;