import Vue from 'vue'
import Router from 'vue-router'

import BeforeEach from './BeforeEach'

import Dashboard from '@/app/dashboard/Dashboard' 
import Login from '@/app/login/router'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: '/',
            redirect: { name: 'dashboard' }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                auth: true,
                module: 'dashboard'
            }
        },
        ...Login,
        {
            path: '*',
            redirect: '/'
        }
    ]
})

// router.afterEach(AfterEach)

router.beforeEach(BeforeEach)

export default router