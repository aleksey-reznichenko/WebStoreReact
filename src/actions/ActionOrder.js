const {actionPromise} = require("../reducers/PromiseReducer");
const {gql} = require("./PathDB");

//OrderUpsert
export const ActionOrder = (orderGoods) => {
    return actionPromise('order', gql(`
            mutation order($order:OrderInput){
                 OrderUpsert(order:$order)
                    { _id total }
                 }
    `, {order: {orderGoods}}))
}
export const ActionFullOrder = (card) =>
    async (dispatch) => {
        let orderGoods = Object.entries(card).map(([_id, {count}]) => ({good: {_id}, count}))
        await dispatch(ActionOrder(orderGoods))
    }
