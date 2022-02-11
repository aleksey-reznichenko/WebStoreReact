import {actionPromise} from "../reducers/PromiseReducer";
import {gql} from "./PathDB";
import {actionCategoryChange, actionCategoryCreate} from "../reducers/CategoryReducer";
import {actionSearchResult} from "../reducers/SearchReducer";

//CategoryFind -- parent: null
export const actionRootCats = () => {
    return actionPromise('rootCats', gql(`query rootCats{
          CategoryFind(query: "[{\\"parent\\": null}]"){
            _id
            name
            subCategories{
              _id,
              name,
              subCategories{
                _id,
                name
              }
            }
          }
        }`)
    )
}
export const actionFullRootCats = () =>
    async dispatch => {
        let value = await dispatch(actionRootCats())
        if (value){
            dispatch(actionCategoryCreate(value))
        }
    }

//CategoryFindOne
const actionCatById = (_id) => {
    return actionPromise('catById', gql(`query catById($q: String){
            CategoryFindOne(query: $q){
                _id goods {
                    _id createdAt name description price images {
                        url
                    }
                }
            }
        }`, {q: JSON.stringify([{_id}])}))
}
export const actionFullCatById = (_id) =>
    async dispatch => {
        let value = await dispatch(actionCatById(_id))
        if (value){
            dispatch(actionCategoryChange(value))
        }
    }

//CategoryCount
export const actionCategoryCount = () => {
    return actionPromise('categoryCount', gql(`query categoryCount{
            CategoryCount(query: "[{}]")
          }`
        )
    )
}

//CategoryUpsert
export const actionCategoryUpsert = category =>
    async dispatch => {
        let value = await dispatch(actionPromise('categoryUpsert', gql(`
                mutation categoryUpsert($category: CategoryInput){
                CategoryUpsert(category: $category) {
                    _id
                }
            }`, {"category": {...category}}
            )
        ))
        if (value) {
            await dispatch(actionFullRootCats())
        }
    }

//CategoryFind
export const actionAllCategory = () => {
    return actionPromise('allCategory', gql(`query allCategory{
          CategoryFind(query: "[{}]"){
            _id
            name
            subCategories{
              _id,
              name,
              subCategories{
                _id,
                name
              }
            }
          }
        }`)
    )
}
export const actionFullAllCategory = () =>
    async dispatch => {
        let value = await dispatch(actionAllCategory())
        if (value){
            dispatch(actionCategoryCreate(value))
        }
    }

//CategoryFind -- search
export const actionSearchCategory = (text) => {
    return actionPromise('searchCategory', gql(`
        query searchCategory($query: String){
          CategoryFind(query: $query){
            _id,
            name,
            createdAt,
            goods {
                _id name 
            },
            subCategories{
              _id,
              name,
              createdAt,
              goods {
                _id name 
              },
              subCategories{
                _id,
                name,
                createdAt,
                goods {
                   _id name 
                },
              }
            }
          }
        }`, {query: JSON.stringify([{name: `/${text}/`}])}
        )
    )
}
export const actionFullSearchCategory = (text) =>
    async dispatch => {
        let value = await dispatch(actionSearchCategory(text))
        if (value){
            dispatch(actionSearchResult(value))
        }
    }
