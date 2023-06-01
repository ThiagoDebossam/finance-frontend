<template>
    <v-card color="grey lighten-4" flat tile>
        <v-toolbar dense color="#0c6c00">
            <v-app-bar-nav-icon color="#fff"></v-app-bar-nav-icon>

            <v-toolbar-title class="title">Olá, {{ name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon color="#fff">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title class="click d-flex align-center" @click="showModalPassowrd = true">
                            <v-icon class="mr-2">key</v-icon>
                            Alterar senha
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title class="click d-flex align-center" @click="logout">
                            <v-icon class="mr-2">logout</v-icon>
                            Sair
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
        <modal-component v-if="showModalPassowrd" max-width="400" title="Alteração senha" show-close @close="closeModalPassword">
            <v-card-text slot="content">
                <v-container fluid>
                    <v-form lazy-validation v-model="valid" @submit.prevent="updatePassword" ref="form">
                        <v-text-field
                            placeholder="Digite sua senha" 
                            class="required-field"
                            outlined
                            :append-icon="visibility ? 'visibility_off' : 'visibility'"
                            @click:append="visibility = visibility ? false : true"
                            label="Senha atual"
                            ref="password"
                            v-model="payload.old_password"
                            :type="visibility ? 'text' : 'password'"
                            :rules="required"></v-text-field>
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
                </v-container>
            </v-card-text>
        </modal-component>
    </v-card>
</template>
<script>

import Auth from '/src/auth'

export default {
    name: 'Toolba',
    computed: {
        name () {
            return Auth.getItem('name')
        }
    },
    data () {
        return {
            showModalPassowrd: false,
            valid: true,
            visibility: false,
            payload: {},
            loading: false
        }
    },
    methods: {
        async logout () {
            await this.$http.post('logout')
            Auth.clear()
            this.$router.go()
        },
        async updatePassword () {
            if (this.$refs.form.validate()) {
                this.loading = true
                await this.$http.post(`update-password`, this.payload)
                    .then(this.afterUpdayePassword)
                    .catch(this.$throwException)
                this.loading = false
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterUpdayePassword ({ data }) {
            this.loading = false
            this.$fnSuccess('Senha alterada')
            this.closeModalPassword()
        },
        closeModalPassword () {
            this.$refs.form.reset()
            this.$nextTick(() => {
                this.$router.go()
            })
        }
    }
}
</script>
<style lang="sass" scoped>@import "./Toolbar.scss"</style>