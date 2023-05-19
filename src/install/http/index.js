import Vue from 'vue'
import axios from 'axios'
import env from '/env'

const http = axios.create({
    baseURL: env.API_URL,
    headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
    }
})

// const request = {
//     success: config => {
//         if (config.data && config.data.hideLoading) {
//             actions.setLoading(store, false)
//         } else {
//             actions.setLoading(store, true)
//         }
//         if (Auth.isLogged()) {
//             config.headers.Authorization = Auth.getItem('userToken')
//             config.headers.people = Auth.getItem('peopleId')
//             config.headers.token = Auth.getItem('userToken')
//         }
//         return config
//     },
//     error: error => {
//         actions.setLoading(store, false)
//         return Promise.reject(error)
//     }
// }
// http.interceptors.request.use(request.success, request.error)

// const response = {
//     success: response => {
//         actions.setLoading(store, false)
//         return response
//     },
//     error: error => {
//         actions.setLoading(store, false)
//         return Promise.reject(error)
//     }
// }
// http.interceptors.response.use(response.success, response.error)

Vue.prototype.$http = http
