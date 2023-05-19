import Auth from '/src/auth'

export default (to, from, next) => {
    if (to.meta.module === 'login' || Auth.isLogged()) {
        next()
    } else {
        next({
            path: '/login',
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
