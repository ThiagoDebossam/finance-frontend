<template>
    <div class="user">
        <v-row justify="center" align="center" class="box-user">
            <v-col class="mt-10" cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <v-card-title class="justify-center">Crie seu usuário</v-card-title>
                    <v-card-text>
                        <v-form lazy-validation v-model="valid" @submit.prevent="create" ref="form">
                            <v-text-field 
                                placeholder="Digite seu nome"
                                class="required-field"
                                outlined
                                label="Nome"
                                v-model="payload.name"
                                type="text"
                                ref="name"
                                :rules="required"
                                ></v-text-field>
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
                            <v-text-field 
                                placeholder="Confirme sua senha" 
                                class="required-field"
                                outlined
                                :append-icon="visibility ? 'visibility_off' : 'visibility'"
                                @click:append="visibility = visibility ? false : true"
                                label="Confirme sua senha"
                                ref="password"
                                v-model="payload.password_confirmation"
                                :type="visibility ? 'text' : 'password'"
                                :rules="required"></v-text-field>
                            <v-btn :disabled="!valid" class="primary" type="submit" block>Salvar</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="mx-3">
                        <a @click="$router.push({name: 'login'})" class="link-sign-in">Já possui cadastro ?</a>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'UserForm',
    data () {
        return {
            payload: {},
            valid: true,
            visibility: false
        }
    },
    mounted () {
        this.$refs.name.focus()
    },
    methods: {
        create () {
            if (this.$refs.form.validate()) {
                this.$http.post('sign-up', this.payload)
                    .then(this.afterCreate)
                    .catch(this.$throwException)
            } else {
                this.$fnError('Formulário incompleto')
            }
        },
        afterCreate () {
            this.$router.push({name: 'login'})
        }
    }
}
</script>
<style lang="sass" scoped >@import "./UserForm.scss"</style>