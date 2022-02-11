export const WishListReducer = (state = {}, { type, good = {}}) => {
    const { _id } = good
    const types = {
        WISHLIST_ADD() {
            return {
                ...state,
                [_id]: {
                    good
                }
            }
        },
        WISHLIST_REMOVE() {
            let { [_id]: remove, ...newState } = state
            return {
                ...newState
            }
        },
        WISHLIST_CLEAR() {
            return {}
        },
    }
    if (type in types) {
        return types[type]()
    }
    return state
}

export const actionWishListAdd = (good) => ({type: "WISHLIST_ADD", good})
export const actionWishListRemove = (good) => ({type: 'WISHLIST_REMOVE', good})
export const actionWishListClear = () => ({type: 'WISHLIST_CLEAR'})
