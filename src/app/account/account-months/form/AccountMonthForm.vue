<template>
    <modal-component v-if="showModal" max-width="400" title="Criar vínculo para conta" show-close @close="closeModal">
        <v-card-text slot="content">
            <v-container>
                <v-form lazy-validation v-model="valid" @submit.prevent="createAccountMonth" ref="form">
                    <v-text-field
                        placeholder="Digite o ano" 
                        class="required-field"
                        outlined
                        v-mask="'####'"
                        label="Ano"
                        v-model="payload.year"
                        :rules="required"></v-text-field>
                    <v-autocomplete
                        placeholder="Selecione" 
                        class="required-field"
                        outlined
                        disabled
                        :items="accounts"
                        item-text="name"
                        item-value="id"
                        label="Conta"
                        v-model="payload.account_id"
                        :rules="required"></v-autocomplete>
                    <v-autocomplete
                        placeholder="Selecione" 
                        class="required-field"
                        outlined
                        :items="months"
                        item-text="month"
                        item-value="id"
                        label="Mês"
                        v-model="payload.month_id"
                        :rules="required"></v-autocomplete>
                    <v-btn :loading="loading" :disabled="!valid" class="primary" type="submit" block>
                        Salvar
                        <template v-slot:loader>
                            <span class="custom-loader">
                            <v-icon light>mdi-cached</v-icon>
                            </span>
                        </template>
                    </v-btn>
                </v-form>
            </v-container>
        </v-card-text>
    </modal-component>
</template>
<script>
import Auth from '/src/auth'
export default {
    name: 'AccountMonthForm',
    data () {
        return {
            showModal: true,
            payload: {
                year: new Date().getFullYear(),
                account_id: this.$route.params.id
            },
            accounts: [],
            months: Auth.getItem('months'),
            valid: true,
            loading: false
        }
    },
    mounted () {
        this.getAccounts()
    },
    methods: {
        createAccountMonth () {
            if (this.$refs.form.validate()) {
                this.loading = true
                this.$http.post('expenses-accounts-month', this.payload)
                    .then(this.afterCreateAccountMonth)
                    .catch(this.$throwException)
                    .finaly(() => {
                        this.loading = false
                    })
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterCreateAccountMonth ({ data }) {
            this.loading = false
            this.$fnSuccess('Conta criada')
            this.closeModal()
        },
        closeModal () {
            this.$emit('close')
        },
        getAccounts () {
            this.$http('/account')
                .then(this.afterGetAccounts)
                .catch(this.$throwException)
        },
        afterGetAccounts ({ data }) {
            this.accounts = data
        },
    }
}
</script>