export const localStoredReducer = (reducer, localStorageName) =>
    (state, action) => {
        if (!state) {
            if (localStorage[localStorageName]){
                return JSON.parse(localStorage[localStorageName])
            }
            else {
                return reducer(state, action)
            }
        }
        else {
            let newState = reducer(state, action)
            localStorage.setItem(localStorageName, JSON.stringify(newState))
            return newState
        }
    }
