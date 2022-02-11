export const UserReducer = (state={}, { type, user={} }) => {
    if (type === 'USER_CREATE') {
        if (Object.entries(user).length !== 0) {
            return {
                ...state,
                ...user
            }
        }
        else
            return state
    }
    if (type === 'USER_CHANGE') {
        if(Object.entries(user).length !== 0) {
            let changeUser = {}
            for (let key in state) {
                if (state[key] === user[key]) {
                    changeUser[key] = state[key]
                }
                else {
                    changeUser[key] = user[key]
                }
            }
            return {
                ...changeUser
            }
        }
        else {
            return state
        }
    }
    if (type === 'USER_REMOVE') {
        return {}
    }
    return state
}

export const actionUserCreate = user => ({ type: 'USER_CREATE', user })
export const actionUserChange = user => ({ type: 'USER_CHANGE', user })
export const actionUserRemove = () => ({ type: 'USER_REMOVE' })
