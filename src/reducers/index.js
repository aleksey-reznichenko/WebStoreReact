import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./CombineReducers";
import {actionFullUserFindOne} from "../actions/ActionUserFind";

export const store = createStore(rootReducer, applyMiddleware(thunk))

if (localStorage.authToken && localStorage.userId){
    store.dispatch(actionFullUserFindOne(localStorage.userId))
}
store.subscribe(() => console.log(store.getState()))
