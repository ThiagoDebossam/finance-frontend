<template>
    <div>
        <v-container fluid>
            <v-flex v-if="dontHaveAccounts" text-xs-center class="d-flex column no-has-account">
                <div>Você ainda não possui nenhuma conta. Vamos criar uma ?</div>
                <v-btn color="#0c6c00" @click="createAccount = true" class="white--text mt-2">Criar conta</v-btn>
            </v-flex>
            <div v-else>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md6 lg4 xl3 pa-3 v-for="(account, index) in accounts" :key="index" @click="goAccount(account.id)">
                        <div class="card-account" :style="`background-color: ${account.background}; color: ${account.color}`">
                            {{account.name}}
                        </div>
                    </v-flex>
                </v-layout>
                <v-btn fab dark color="#0c6c00" class="button-float" @click="createAccount = true">
                    <v-icon dark>
                        add
                    </v-icon>
                </v-btn>
            </div>
        </v-container>
        <AccountForm v-if="createAccount" @close="closeForm" />
    </div>
</template>
<script>

import AccountForm from '@/app/account/AccountForm'
import tinycolor from 'tinycolor2'

export default {
    name: 'Dashboard',
    components: {
        AccountForm
    },
    data () {
        return {
            accounts: [],
            createAccount: false
        }
    },
    mounted () {
        this.getAccounts()
    },
    computed: {
        dontHaveAccounts () {
            return this.accounts.length === 0
        }
    },
    methods: {
        getAccounts () {
            this.$http('/account')
                .then(this.afterGetAccounts)
                .catch(this.$throwException)
        },
        afterGetAccounts ({ data }) {
            this.accounts = data
            this.accounts.forEach(account => {
                account.background = this.getRandomColor()
                account.color = tinycolor(account.background).isLight() ? 'black' : 'white'
            })
        },
        closeForm () {
            this.createAccount = false
            this.getAccounts()
        },
        getRandomColor() {
            const hexChars = '0123456789ABCDEF'

            let color = '#'

            for (let i = 0; i < 6; i++) {
                color += hexChars[Math.floor(Math.random() * 16)]
            }

            return color
        },
        goAccount (id) {
            this.$router.push({name: 'account-month', params: { id }})
        }
    }
}
</script>
<style lang="sass" scoped >@import "./Dashboard.scss"</style>