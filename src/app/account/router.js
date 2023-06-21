import AccountMonth from './account-months/AccountMonth'

export default [
    {
        path: '/account-month/:id',
        name: 'account-month',
        component: AccountMonth,
        meta: {
            module: 'account'
        }
    }
]
