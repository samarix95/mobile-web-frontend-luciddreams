import { SET_LANGUAGE } from "../actions/types";

const initialState = {
    lang: "en"
};

export function languageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
}

export const getLanguage = state => state.language.lang;