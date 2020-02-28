import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";

const middleWares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
