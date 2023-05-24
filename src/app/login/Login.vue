<template>
    <div class="login">
        <v-row justify="center" align="center" class="box-login">
            <v-col class="mt-10" cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <v-card-title class="justify-center">Finanças</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation v-model="valid" @submit.prevent="login" ref="form">
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
                            <v-btn :disabled="!valid" class="primary" type="submit" block>Entrar</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="mx-3">
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
    name: 'LoginComponent',
    data () {
        return {
            payload: {},
            valid: true,
            visibility: false
        }
    },
    mounted () {
        if (Auth.isLogged()) this.$router.push({name: 'dashboard'})
        this.$refs.password.focus()
        this.$refs.email.focus()
    },
    methods: {
        login () {
            if (this.$refs.form.validate()) {
                this.$http.post('sign-in', this.payload)
                    .then(this.afterLogin)
                    .catch(this.$throwException)
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterLogin ({ data }) {
            Auth.setSession(data)
            this.$nextTick(() => {
                this.$router.go()
            })
        }
    }
}
</script>
<style lang="sass" scoped>@import "./Login.scss"</style>