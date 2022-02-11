import {actionPromise} from "../reducers/PromiseReducer";
import {gql} from "./PathDB";
import {actionMyOrder} from "../reducers/MyOrdersReducer";

//OrderFind
const actionOrderFind = (count, limit) => {
    return actionPromise('orderFind', gql(`query orderFind($query: String!) {
        OrderFind(query: $query) {
            _id total createdAt orderGoods{
                _id count price good{
                    _id name description images{
                        _id url
                    }
                }
            }
        }
    }`,
            {
                query: JSON.stringify([{}, { sort: [{ ["createdAt"]: -1 }],
                    skip: [count || 0], limit: [limit] }])
            }
        )
    )
}
export const actionFullOrderFind = (count=0, limit=100) =>
    async dispatch => {
        let value = await dispatch(actionOrderFind(count, limit))
        if (value){
            dispatch(actionMyOrder(value))
        }
    }

//OrderCount
export const actionOrderCount = () => {
    return actionPromise('orderCount', gql(`query orderCount{
            OrderCount(query: "[{}]")
        }`)
    )
}

//OrderFindOne
export const actionOrderFindOne = (_id) => {
    return actionPromise('orderFindOne', gql(`query orderFindOne($q: String){
            OrderFindOne(query: $q) {
             _id createdAt total orderGoods {
                    _id price count total good {
                        _id createdAt name images {
                            _id url
                        }
                    }
                  }
             }
        }`,  {q: JSON.stringify([{_id}])})
    )
}
