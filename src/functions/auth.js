import jwt_decode from "jwt-decode";

import store from "../store";
import { setUserData, resetUserData } from "../actions/actions";

export function checkToken() {
    if (localStorage.token) {
        const decoded = jwt_decode(localStorage.token);
        store.dispatch(setUserData(decoded));
        if (decoded.exp < Date.now() / 1000) {
            alert("Токен просрочен. Пожалуйста, перезайдите на сайт.");
            return false;
        }
        else
            return true;
    }
    else {
        return false;
    }
}

export function setToken(token) {
    localStorage.setItem("token", token);
    return jwt_decode(token);
}

export function removeToken() {
    localStorage.removeItem("token");
    store.dispatch(resetUserData());
}