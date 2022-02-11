import {actionPromise} from "../reducers/PromiseReducer";
import {backURL, gql} from "./PathDB";
import {actionFullUserFindOne} from "./ActionUserFind";

export const actionUploadFile = file => {
    let fd = new FormData()
    fd.append('photo', file)
    return actionPromise('uploadFile', fetch(`${backURL}/upload`, {
        method: "POST",
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: fd
    }).then(res => res.json()).catch(err => console.log(err)))
}

export const actionUploadFiles = array =>
    async dispatch => {
        // let arrayDispatch = []
        for (const file of array) {
            // arrayDispatch.push(dispatch(actionUploadFile(file)))
            await dispatch(actionUploadFile(file))
        }
        // await Promise.all(arrayDispatch)
    }

export const actionSetAvatar = file =>
     async (dispatch, getState) => {
         let result = await dispatch(actionUploadFile(file))
         if (result) {
             let value = await dispatch(actionPromise('setAvatar',
                 gql(`mutation setAvatar($myid: String, $imageid: ID){
                    UserUpsert(user:{
                                    _id: $myid, 
                                    avatar: {_id: $imageid}})
                    {
                        _id, avatar {
                            _id
                        }
                    }
                }`, {myid: getState().user._id, imageid: result._id})))
             if (value){
                 await dispatch(actionFullUserFindOne(getState().user._id))
             }
         }
     }

export const actionSetUserUpsert = newValue =>
    async (dispatch, getState) => {
        let value = await dispatch(actionPromise('setUserUpsert',
            gql(`mutation setUserUpsert($user: UserInput){
                    UserUpsert(user: $user){
                        _id
                    }
                }`, {"user": {_id: getState().user._id, ...newValue}})))
        if (value){
            await dispatch(actionFullUserFindOne(getState().user._id))
        }
    }
