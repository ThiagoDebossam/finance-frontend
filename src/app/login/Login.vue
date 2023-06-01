<template>
    <div class="login">
        <v-row justify="center" align="center" class="box-login">
            <v-col class="mt-10" cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <v-card-title class="justify-center">Finanças</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation v-model="valid" @submit.prevent="!processForgotPassword ? login() : forgotPassword()" ref="form">
                            <v-text-field 
                                placeholder="Digite seu e-mail"
                                class="required-field"
                                outlined label="E-mail"
                                v-model="payload.email"
                                type="email"
                                ref="email"
                                :rules="required"
                                ></v-text-field>
                            <v-text-field
                                v-if="!processForgotPassword"
                                placeholder="Digite sua senha" 
                                class="required-field"
                                outlined
                                :append-icon="visibility ? 'visibility_off' : 'visibility'"
                                @click:append="visibility = visibility ? false : true"
                                label="Senha"
                                ref="password"
                                v-model="payload.password"
                                :type="visibility ? 'text' : 'password'"
                                :rules="required"></v-text-field>
                            <v-btn :loading="loading" v-if="!processForgotPassword" :disabled="!valid" class="primary" type="submit" block>
                                Entrar
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                            <v-btn :loading="loading" v-else :disabled="!valid" class="primary" type="submit" block>
                                Enviar e-mail
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="mx-3 d-flex justify-space-between">
                        <a v-if="processForgotPassword" @click="processForgotPassword = false" class="link-sign-up">Voltar para o login</a>
                        <a v-else @click="forgotPassword" class="link-sign-up">Esqueci minha senha</a>
                        <a @click="$router.push({name: 'user.create'})" class="link-sign-up">Não possui cadastro ?</a>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Auth from '/src/auth'
export default {
    name: 'Login',
    data () {
        return {
            payload: {},
            valid: true,
            visibility: false,
            loading: false,
            processForgotPassword: false
        }
    },
    mounted () {
        if (Auth.isLogged()) this.$router.push({name: 'dashboard'})
        this.$refs.password.focus()
        this.$refs.email.focus()
    },
    methods: {
        async login () {
            if (this.$refs.form.validate()) {
                this.loading = true
                await this.$http.post('sign-in', this.payload)
                    .then(this.afterLogin)
                    .catch(this.$throwException)
                this.loading = false
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterLogin ({ data }) {
            Auth.setSession(data)
            this.$nextTick(() => {
                this.$router.go()
            })
        },
        forgotPassword () {
            if (!this.payload.email) {
                this.$fnInfo('Digite seu email')
                this.$refs.email.focus()
                this.processForgotPassword = true
                return false
            }
            const call = async () => {
                this.loading = true
                await this.$http.post(`forgot-password`, {email: this.payload.email})
                    .then(this.afterForgotPassword)
                    .catch(this.$throwException)
                this.loading = false
            }
            if (!this.processForgotPassword) {
                this.$askBefore(call, () => {
                    if (!this.processForgotPassword) {
                        this.processForgotPassword = true
                        this.$nextTick(() => {
                            this.$refs.form.reset()
                        })
                    }
                }, 'Atenção', `Deseja solicitar alteração de senha para o e-mail '${this.payload.email}' ?`)
            } else {
                call()
            }
        },
        afterForgotPassword ({ data }) {
            this.loading = false
            if (this.processForgotPassword) this.processForgotPassword = false
            this.$fnSuccess('E-mail enviado')
        }
    }
}
</script>
<style lang="sass" scoped>@import "./Login.scss"</style>
