export const CategoryReducer = (state={}, { type, value={} }) => {
    if (type === 'CATEGORY_CREATE') {
        if (Object.entries(value).length !== 0) {
            return {
                ...state,
                ...value
            }
        }
        else
            return state
    }
    if (type === 'CATEGORY_CHANGE') {
        if (Object.entries(value).length !== 0) {
            for (const item of Object.entries(state)) {
                if(item[1]['_id'] === value['_id']){
                    item[1]['goods'] = value['goods']
                }
                else if(item[1]['subCategories'] !== null){
                    for (const itemSub of Object.entries(item[1]['subCategories'])) {
                        if(itemSub[1]['_id'] === value['_id']){
                            itemSub[1]['goods'] = value['goods']
                        }
                        else if(itemSub[1]['subCategories'] !== null){
                            for (const itemSubSub of Object.entries(itemSub[1]['subCategories'])) {
                                if(itemSubSub[1]['_id'] === value['_id']){
                                    itemSubSub[1]['goods'] = value['goods']
                                }
                            }
                        }
                    }
                }
            }
            return {
                ...state
            }
        }
        else
            return {...state}
    }
    if (type === 'CATEGORY_REMOVE') {
        return {}
    }
    return state
}

export const actionCategoryCreate = value => ({ type: 'CATEGORY_CREATE', value })
export const actionCategoryChange = value => ({ type: 'CATEGORY_CHANGE', value })
export const actionCategoryRemove = () => ({ type: 'CATEGORY_REMOVE' })
