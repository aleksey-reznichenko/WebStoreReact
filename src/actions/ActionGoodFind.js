import {actionSearchResult} from "../reducers/SearchReducer";
const {actionPromise} = require("../reducers/PromiseReducer");
const {gql} = require("./PathDB");

//GoodFindOne
export const actionGoodFindOne = (_id) =>
    actionPromise('goodFindOne', gql(`query goodFindOne($q :String){
            GoodFindOne(query:  $q){
                _id name price createdAt description images{
                    _id url originalFileName
                }, categories {
                  _id name 
                }
            }
    }`, { q: JSON.stringify([{ _id }]) }))

//GoodFind
export const actionGoodFind = (text) => {
    return actionPromise('goodFind', gql(`
        query goodFind($query: String){
            GoodFind(query: $query){
                _id, name, description, price, images{
                    _id, url
                }, categories {
                    _id, name
                }
            }
        }`, {
                query: JSON.stringify([
                    {
                        $or: [{name: `/${text}/`}, {description: `/${text}/`}]
                    },
                    {
                        sort: [{title: 1}]
                    }
                ])
            }
        )
    )
}
export const actionFullGoodFind = (text) =>
    async dispatch => {
        let value = await dispatch(actionGoodFind(text))
        if (value){
            dispatch(actionSearchResult(value))
        }
    }

//GoodFind - name: {$ne: null}
export const actionAllGoodFind = () => {
    return actionPromise('goodAllFind', gql(`
        query goodAllFind($query: String){
            GoodFind(query: $query){
                _id name
            }
        }`, {query: JSON.stringify([{name: {$ne: null}}])}
        )
    )
}

//GoodCount
export const actionGoodCount = () => {
    return actionPromise('goodCount', gql(`query goodCount{
              GoodCount(query: "[{}]")
            }`
        )
    )
}
