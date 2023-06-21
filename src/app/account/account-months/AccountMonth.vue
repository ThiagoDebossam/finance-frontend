<template>
    <div>
        <v-container fluid>
            <v-flex v-if="dontHaveList" text-xs-center class="d-flex column no-has-account">
                <div>Você ainda não possui nenhum registro. Deseja criar um ?</div>
                <v-btn color="#0c6c00" @click="create = true" class="white--text mt-2">Criar</v-btn>
            </v-flex>
        </v-container>
        <AccountMonthForm v-if="create" @close="closeForm" />
    </div>
</template>
<script>
import AccountMonthForm from './form/AccountMonthForm'

export default {
    name: 'AccountMonth',
    components: {
        AccountMonthForm
    },
    data () {
        return {
            account_id: this.$route.params.id,
            list: [],
            create: false
        }
    },
    mounted () {
        this.getList()
    },
    computed: {
        dontHaveList () {
            return this.list.length === 0
        }
    },
    methods: {
        getList () {
            const filter = this.$urlEncode({account_id: this.account_id})
            this.$http(`expenses-accounts-month?${filter}`)
                .then(this.afterGetList)
                .catch(this.$throwException)
        },
        afterGetList ({ data }) {
            this.list = data
        },
        closeForm () {
            this.create = false
            this.getList()
        }
    }
}
</script>
<style lang="sass" scoped >@import "./AccountMonth.scss"</style>