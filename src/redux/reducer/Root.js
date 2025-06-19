import { combineReducers } from "redux";
import { ApiReducer } from "./ApiReducer";

export const Root = combineReducers({
    uData:ApiReducer
})