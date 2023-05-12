<template>
    <div class="login">
        <v-row justify="center" align="center" class="box-login">
            <v-col class="mt-10" cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <v-card-title class="justify-center">Finanças</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation v-model="valid" @submit.prevent="login" ref="form">
                            <v-text-field placeholder="Digite seu e-mail" class="required-field" outlined label="E-mail" v-model="payload.email" type="email" :rules="required"></v-text-field>
                            <v-text-field placeholder="Digite sua senha" class="required-field" outlined label="Senha" v-model="payload.password" type="password" :rules="required"></v-text-field>
                            <v-btn :disabled="!valid" class="primary" type="submit" block>Entrar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'LoginComponent',
    data () {
        return {
            payload: {},
            valid: true,
            required: [
                v => !!v || 'Campo obrigatório'
            ]
        }
    },
    methods: {
        login () {
            if (this.$refs.form.validate()) {
                this.$http('teste')
            } else {
                this.$fnError('Formulário incompleto')
            }
        }
    }
}
</script>
<style lang="sass">@import "./Login.scss"</style>