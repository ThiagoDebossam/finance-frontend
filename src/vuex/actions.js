export default {
    setBreadcrumbs ({ commit }, payload) {
        commit('SET_BREADCRUMBS', payload)
    },
    setExpiredSession({ commit }, payload) {
        commit('SET_EXPIRED_SESSION', payload)
    }
}
