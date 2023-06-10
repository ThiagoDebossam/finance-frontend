<template>
    <div>
        <v-container fluid>
            <v-flex v-if="dontHaveAccounts" text-xs-center class="d-flex column no-has-account">
                <div>Você ainda não possui nenhuma conta. Vamos criar uma ?</div>
                <v-btn color="#0c6c00" class="white--text mt-2">Criar conta</v-btn>
            </v-flex>
            <div v-else>
                oi
            </div>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'Dashboard',
    data () {
        return {
            accounts: []
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
        }
    }
}
</script>
<style lang="sass" scoped >@import "./Dashboard.scss"</style>