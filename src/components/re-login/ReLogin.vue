<template>
    <modal-component v-if="showModal" max-width="400" title="Sua sessão expirou" :show-close="false">
        <v-card-text slot="content">
            <div class="text-center" style="font-size: 17px">
                Olá, {{ name }} <br>
                Faça login novamente <br> para continuar usando o sistema!
            </div>
            <v-container fluid>
                <v-form lazy-validation v-model="valid" @submit.prevent="login" ref="form">
                    <v-text-field 
                        placeholder="Digite sua senha" 
                        class="required-field"
                        outlined
                        :append-icon="visibility ? 'visibility_off' : 'visibility'"
                        @click:append="visibility = visibility ? false : true"
                        label="Senha"
                        ref="password"
                        v-model="password"
                        :type="visibility ? 'text' : 'password'"
                        :rules="required"></v-text-field>
                    <v-layout row pa-3 justify-space-between>
                        <v-flex xs12 sm6 md6 lg6 xl6 px-1>
                            <v-btn class="grey white--text" type="button" @click="logout" block>Sair</v-btn>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg6 xl6>
                            <v-btn :disabled="!valid" color="#0c6c00" class="white--text" type="submit" block>Entrar</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
        </v-card-text>
    </modal-component>
</template>
<script>

import Auth from '/src/auth'
import { mapActions } from 'vuex'

export default {
    name: 'ReLogin',
    data () {
        return {
            showModal: true,
            password: null,
            visibility: false,
            valid: true
        }
    },
    mounted () {
        this.$refs.password.focus()
    },
    computed: {
        name () {
            return Auth.getItem('name')
        }
    },
    methods: {
        ...mapActions(['setExpiredSession']),
        logout () {
            Auth.clear()
            this.$router.go()
        },
        login () {
            if (this.$refs.form.validate()) {
                const payload = {
                    email: Auth.getItem('email'),
                    password: this.password
                }
                this.$http.post('sign-in', payload)
                    .then(this.afterLogin)
                    .catch(this.$throwException)
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterLogin ({ data }) {
            Auth.setSession(data)
            this.setExpiredSession(false)
        }
    }
}
</script>
<style lang="sass" scoped>@import "./ReLogin.scss"</style>