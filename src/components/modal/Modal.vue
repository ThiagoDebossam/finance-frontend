<template>
    <v-dialog transition="dialog-top-transition" :max-width="maxWidth" v-model="showModal" :persistent="persistent">
        <v-card>
            <v-toolbar :color="colorTitle" dark height="40px" class="mb-2">
                <div class="d-flex justify-space-between" style="width: 100%">
                    <div>{{title}}</div>
                    <v-icon class="click" color="#fff" v-if="showClose" @click="close">close</v-icon>
                </div>
            </v-toolbar>
            <slot name="content"></slot>
            <slot name="actions"></slot>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'ModalComponent',
    props: {
        title: {
            type: String,
            required: true
        },
        colorTitle: {
            type: String,
            default: '#0c6c00'
        },
        maxWidth: {
            default: '600'
        },
        showClose: {
            type: Boolean,
            default: true
        },
        persistent: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            showModal: true
        }
    },
    methods: {
        close () {
            this.$emit('close')
        }
    }
}
</script>
<style lang="sass" scoped>@import "./Modal.scss"</style>