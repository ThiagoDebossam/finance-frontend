<template>
    <modal-component v-if="showModal" max-width="400" title="Criar vínculo para conta" show-close @close="closeModal">
        <v-card-text slot="content">
            <v-container>
                <v-form lazy-validation v-model="valid" @submit.prevent="createAccount" ref="form">
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
                        :items="[]"
                        item-text="name"
                        item-value="id"
                        label="Conta"
                        v-model="payload.account_id"
                        :rules="required"></v-autocomplete>
                    <v-autocomplete
                        placeholder="Selecione" 
                        class="required-field"
                        outlined
                        :items="[]"
                        item-text="name"
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
export default {
    name: 'AccountMonthForm',
    data () {
        return {
            showModal: true,
            payload: {
                year: new Date().getFullYear()
            },
            valid: true,
            loading: false
        }
    },
    mounted () {
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