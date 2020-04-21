import { SET_OPEN_SNACKBAR, SET_CLOSE_SNACKBAR } from "../actions/types";

const initialState = {
    isOpen: false,
    data: {
        variant: "",
        message: ""
    }
};

export function snackbarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_OPEN_SNACKBAR:
            return {
                ...state,
                isOpen: true,
                data: action.data
            };
        case SET_CLOSE_SNACKBAR:
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }
}

export const getSnackbarOpen = state => state.snackbar.isOpen;
export const getSnackbarData = state => state.snackbar.data;