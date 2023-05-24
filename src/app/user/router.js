import UserForm from './user-form/UserForm'

export default [
    {
        path: '/sign-up',
        name: 'user.create',
        component: UserForm,
        meta: {
            module: 'user'
        }
    }
]
