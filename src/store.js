import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

const middlewares = [thunk];

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));