<template>
    <modal-component v-if="showModal" max-width="400" title="Criar Conta" show-close @close="closeModal">
        <v-card-text slot="content">
            <v-container>
                <v-form lazy-validation v-model="valid" @submit.prevent="createAccount" ref="form">
                    <v-text-field
                        ref="name"
                        placeholder="Digite o nome" 
                        class="required-field"
                        outlined
                        label="Nome da conta"
                        v-model="name"
                        :rules="required"></v-text-field>
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
export default {
    name: 'AccountForm',
    data () {
        return {
            showModal: true,
            name: null,
            valid: true,
            loading: false
        }
    },
    mounted () {
        this.$refs.name.focus()
    },
    methods: {
        async createAccount () {
            if (this.$refs.form.validate()) {
                this.loading = true
                await this.$http.post('account', {name: this.name})
                    .then(this.afterCreateAccount)
                    .catch(this.$throwException)
                this.loading = false
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterCreateAccount ({ data }) {
            this.loading = false
            this.$fnSuccess('Conta criada')
            this.closeModal()
        },
        closeModal () {
            this.$emit('close')
        }
    }
}
</script>
<style lang="sass">@import "./Account.scss"</style>