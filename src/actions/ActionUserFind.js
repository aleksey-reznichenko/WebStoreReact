import {actionUserCreate} from "../reducers/UserReducer";
const {actionPromise} = require("../reducers/PromiseReducer");
const {gql} = require("./PathDB");

//UserFindOne
export const actionUserFindOne = (_id) => {
    return actionPromise('userfindone', gql(`query userfindone($q: String){
      UserFindOne(query: $q){
        _id createdAt login nick acl avatar{
            _id text url originalFileName
          }
        }
      }`,  {q: JSON.stringify([{_id}])}))
}
export const actionFullUserFindOne = (_id) =>
    async dispatch => {
        let value = await dispatch(actionUserFindOne(_id))
        if (value){
            dispatch(actionUserCreate(value))
        }
    }

//UserFind
export const actionUserFind = (count=0, limit=100) => {
    return actionPromise('allUsers', gql(`query allUsers($query: String!){
          UserFind(query: $query){
            _id login createdAt nick acl avatar 
             {_id, url}
           }
        }`,
            {
                query: JSON.stringify([{}, { sort: [{ ["createdAt"]: -1 }], skip: [count || 0], limit: [limit] }]),
            }
        )
    )
}

//UserCount
export const actionUserCount = () => {
    return actionPromise('usersCount', gql(`query usersCount{
            UserCount(query: "[{}]")
        }`)
    )
}
