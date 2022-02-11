const jwtDecode = token => {
    try {
        let arrToken = token.split('.')
        let base64Token = atob(arrToken[1])
        return JSON.parse(base64Token)
    }
    catch (e) {
        console.log(e.message());
    }
}

export const AuthReducer = (state, { type, token }) => {
    if (!state) {
        if (localStorage.authToken) {
            type = 'AUTH_LOGIN'
            token = localStorage.authToken
        } else state = {}
    }
    if (type === 'AUTH_LOGIN') {
        localStorage.setItem('authToken', token)
        let payload = jwtDecode(token)
        if (typeof payload === 'object') {
            localStorage.setItem('userId', payload?.sub?.id)
            return {
                ...state,
                token,
                payload
            }
        } else return state
    }
    if (type === 'AUTH_LOGOUT') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userId')
        return {}
    }
    return state
}

export const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token })
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })
