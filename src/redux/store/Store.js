import { applyMiddleware, createStore } from "redux";
import { Root } from "../reducer/Root";
import { thunk } from "redux-thunk";

export const Store = createStore(Root,applyMiddleware(thunk))