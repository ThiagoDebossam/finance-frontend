import Auth from '/src/auth'

export default (to, from, next) => {
    if (!to.meta.auth|| Auth.isLogged()) {
        next()
    } else {
        next({
            path: '/sign-in',
            query: { redirect: to.fullPath }
        })
    }
        
    //     next()
    // } else {
    //     next({
    //         path: '/',
    //         query: { redirect: to.fullPath }
    //     })
    // }
}
