import { SET_THEME } from "../actions/types";

const startTime = "07:00:00";
const endTime = "21:00:00";
const currentDate = new Date();

let startDate = new Date(currentDate.getTime());
let endDate = new Date(currentDate.getTime());

startDate.setHours(startTime.split(":")[0]);
startDate.setMinutes(startTime.split(":")[1]);
startDate.setSeconds(startTime.split(":")[2]);
endDate.setHours(endTime.split(":")[0]);
endDate.setMinutes(endTime.split(":")[1]);
endDate.setSeconds(endTime.split(":")[2]);

const initialState = startDate < currentDate && currentDate < endDate
    ? {
        theme: {
            palette: {
                type: "light",
                primary: { main: "#424242" },
                secondary: { main: "#f50057" },
                error: { main: "#cc0000" }
            }
        }
    }
    : {
        theme: {
            palette: {
                type: "dark",
                primary: { main: "#ffffff" },
                secondary: { main: "#f50057" },
                error: { main: "#cc0000" }
            }
        }
    };

export function appThemeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.theme
            };
        default:
            return state;
    }
}

export const getThemePalette = state => state.appTheme.theme;