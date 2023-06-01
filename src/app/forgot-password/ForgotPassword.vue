<template>
    <div class="login">
        <v-row justify="center" align="center" class="box-login">
            <v-col class="mt-10" cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <v-card-title class="justify-center">Recuperar conta</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation v-model="valid" @submit.prevent="recoverPassword" ref="form">
                            <v-text-field
                                placeholder="Digite sua senha" 
                                class="required-field"
                                outlined
                                :append-icon="visibility ? 'visibility_off' : 'visibility'"
                                @click:append="visibility = visibility ? false : true"
                                label="Nova Senha"
                                ref="password"
                                v-model="payload.password"
                                :type="visibility ? 'text' : 'password'"
                                :rules="required"></v-text-field>
                            <v-text-field
                                placeholder="Digite sua senha" 
                                class="required-field"
                                outlined
                                :append-icon="visibility ? 'visibility_off' : 'visibility'"
                                @click:append="visibility = visibility ? false : true"
                                label="Confirme sua Senha"
                                v-model="payload.password_confirmation"
                                :type="visibility ? 'text' : 'password'"
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
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'ForgotPassword',
    data () {
        return {
            payload: {},
            valid: true,
            visibility: false,
            loading: false
        }
    },
    mounted () {
        this.payload.token = this.$route.params.token
        this.$refs.password.focus()
    },
    methods: {
        async recoverPassword () {
            if (this.$refs.form.validate()) {
                this.loading = true
                await this.$http.post(`recover-password`, this.payload)
                    .then(this.afterRecoverPassword)
                    .catch(this.$throwException)
                this.loading = false
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterRecoverPassword ({ data }) {
            this.loading = false
            this.$fnSuccess('Senha alterada')
            this.$router.push({name: 'login'})
            this.$nextTick(() => {
                this.$router.go()
            })
        }
    }
}
</script>
<style lang="sass" scoped>@import "./ForgotPassword.scss"</style>
