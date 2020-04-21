import { SET_THEME } from "../actions/types";

const initialState = {
    theme: {
        palette: {
            type: "dark",
            primary: { main: "#ffffff" },
            secondary: { main: "#f50057" },
            error: { main: "#cc0000" }
        }
    }
}

export function appThemeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_THEME:
            console.log(action);
            return {
                ...state,
                theme: action.theme
            };
        default:
            return state;
    }
}

export const getThemePalette = state => state.appTheme.theme;