export const SearchReducer = (state={}, { type, value }) => {
    if (type === 'SEARCH_RESULT'){
        return {
            searchResult: {...value}
        }
    }
    if (type === 'SEARCH_REMOVE'){
        return {}
    }
    return state
}

export const actionSearchResult = value => ({type: 'SEARCH_RESULT', value})
export const actionSearchRemove = () => ({type: 'SEARCH_REMOVE'})
