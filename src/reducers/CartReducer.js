export const CartReducer = (state = {}, { type, good = {}, count = 1 }) => {
    const { _id } = good
    const types = {
        CART_ADD() {
            count = +count
            if (!count) return state
            return {
                ...state,
                [_id]: {
                    good,
                    count: count + (state[_id]?.count || 0)
                }
            }
        },
        CART_CHANGE() {
            count = +count;
            if (!count){
                return state
            }
            return {
                ...state,
                [_id]: {good, count}
            }
        },
        CART_REMOVE() {
            let { [_id]: remove, ...newState } = state
            return {
                ...newState
            }
        },
        CART_CLEAR() {
            return {}
        },
    }
    if (type in types) {
        return types[type]()
    }
    return state
}

export const actionCartAdd = (good, count=1) => ({type: "CART_ADD", good, count});
export const actionCardChange = (good, count) => ({type: 'CART_CHANGE', good, count})
export const actionCardRemove = (good) => ({type: 'CART_REMOVE', good})
export const actionCardClear = () => ({type: 'CART_CLEAR'})
