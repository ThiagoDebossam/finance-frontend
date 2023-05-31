import ForgotPassword from './ForgotPassword'

export default [
    {
        path: '/forgot-password/:token',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            module: 'login'
        }
    }
]
