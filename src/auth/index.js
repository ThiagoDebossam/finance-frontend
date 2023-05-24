export default {
    clear() {
        sessionStorage.clear()
    },
    setSession(session) {
        const token = session.token
        sessionStorage.setItem('_session', JSON.stringify(session))
        sessionStorage.setItem('_token', token)
    },
    isLogged() {
        const token = sessionStorage.getItem('_token')
        if (token) {
            return typeof token === 'string'
        }
    },
    // setItem(key, value) {
    //     const aux = JSON.parse(base64url.decode(sessionStorage.getItem('_session')))
    //     aux[key] = value
    //     sessionStorage.setItem('_session', base64url.encode(JSON.stringify(aux)))
    // },
    getItem(key) {
        const session = sessionStorage.getItem('_session')
        if (session) {
            return JSON.parse(session)[key]
        }
    },
    getToken () {
        return sessionStorage.getItem('_token')
    }
    // removeItem(key) {
    //     return sessionStorage.removeItem(key)
    // },
    // isLogged() {
    //     if (sessionStorage.getItem('_session')) {
    //         return typeof JSON.parse(base64url.decode(sessionStorage.getItem('_session'))).userToken === 'string'
    //     }
    // }
}
