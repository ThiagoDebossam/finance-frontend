import Vue from 'vue'
import Router from 'vue-router'

import BeforeEach from './BeforeEach'

import Dashboard from '@/app/dashboard/Dashboard' 
import Login from '@/app/login/router'
import User from '@/app/user/router'
import ForgotPassword from '@/app/forgot-password/router'
import Account from '@/app/account/router'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/'
        },
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
        ...User,
        ...ForgotPassword,
        ...Account
    ]
})

// router.afterEach(AfterEach)

router.beforeEach(BeforeEach)

export default router