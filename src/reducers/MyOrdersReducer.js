export const MyOrdersReducer = (state={}, { type, value }) => {
    if (type === 'ORDER_RESULT'){
        return {
            orderResult : {
                ...value
            }
        }
    }
    if (type === 'ORDER_CLEAR'){
        return {}
    }
    return state
}

export const actionMyOrder = value => ({type: 'ORDER_RESULT', value})
export const actionMyOrderClear = () => ({type: 'ORDER_CLEAR'})
