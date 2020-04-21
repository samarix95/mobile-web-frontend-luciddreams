import { SET_CONFIRM_DIALOG_OPEN, SET_CONFIRM_DIALOG_CANCEL, SET_CONFIRM_DIALOG_ACCEPT, SET_CONFIRM_DIALOG_RESET_ACCEPT } from "../actions/types";

const initialState = {
    isOpen: false,
    data: {
        title: "",
        message: ""
    },
    action: null
};

export function dialogConfirmReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONFIRM_DIALOG_OPEN:
            return {
                ...state,
                isOpen: true,
                data: action.data
            };
        case SET_CONFIRM_DIALOG_CANCEL:
            return {
                ...state,
                isOpen: false,
                action: false
            };
        case SET_CONFIRM_DIALOG_ACCEPT:
            return {
                ...state,
                isOpen: false,
                action: true
            };
        case SET_CONFIRM_DIALOG_RESET_ACCEPT:
            return {
                ...state,
                action: null
            };
        default:
            return state;
    }
}

export const getDialogConfirmOpen = state => state.dialogConfirm.isOpen;
export const getDialogConfirmData = state => state.dialogConfirm.data;
export const getDialogConfirmAction = state => state.dialogConfirm.action;