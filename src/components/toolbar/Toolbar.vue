<template>
    <v-card color="grey lighten-4" flat tile>
        <v-toolbar dense color="#0c6c00">
            <v-app-bar-nav-icon color="#fff"></v-app-bar-nav-icon>

            <v-toolbar-title class="title">Olá, {{ name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu >
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
                        <v-list-item-title class="click d-flex align-center" @click="logout">
                            <v-icon class="mr-2">logout</v-icon>
                            Sair
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
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
    methods: {
        async logout () {
            await this.$http.post('logout')
            Auth.clear()
            this.$router.go()
        }
    }
}
</script>
<style lang="sass" scoped>@import "./Toolbar.scss"</style>