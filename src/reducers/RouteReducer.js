export const RouteReducer = (state={}, { type, match }) => {
    if (type === 'ROUTE_ADD') {
        return match
    }
    if (type === 'ROUTE_CLEAR'){
        return {}
    }
    return state
}

export const actionMyRoute = match => ({type: 'ROUTE_ADD', match})
export const actionMyRouteClear = () => ({type: 'ROUTE_CLEAR'})
