export default {
    SET_BREADCRUMBS (store, payload) {
        store.breadcrumbs = payload
    },
    SET_EXPIRED_SESSION (store, payload) {
        store.expiredSession = payload
    }
}
