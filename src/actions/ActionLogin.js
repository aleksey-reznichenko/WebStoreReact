import {actionFullUserFindOne} from "./ActionUserFind";
const {actionAuthLogin} = require("../reducers/AuthReducer");
const {actionPromise} = require("../reducers/PromiseReducer");
const {gql} = require("./PathDB");

//login
const actionLogin = (login, password) => {
    return actionPromise('login', gql(`query login($login: String, $password: String){
      login(login: $login, password: $password)
    }`, {login: login, password: password}))
}
export const actionFullLogin = (login, password) =>
    async dispatch => {
        let token = await dispatch(actionLogin(login, password))
        if (token){
            let user = await dispatch(actionAuthLogin(token))
            if (user) {
                localStorage?.userId && dispatch(actionFullUserFindOne(localStorage.userId))
            }
        }
    }

//register
export const actionRegister = (login, password) => {
    return actionPromise('register', gql(`mutation register($login:String, $password: String){
      UserUpsert(user:{
                 login: $login, 
                 password: $password, 
                 nick: $login}){
        _id login
      }
    }`, {login: login, password: password}))
}
export const actionFullRegister = (login, password) =>
    async dispatch => {
        let allow = await dispatch(actionRegister(login, password))
        if (allow) {
            let token = await dispatch(actionLogin(login, password))
            if (token) {
                let user = await dispatch(actionAuthLogin(token))
                if (user) {
                    localStorage?.userId && dispatch(actionFullUserFindOne(localStorage.userId))
                }
            }
        }
    }
