import Vue from 'vue'

import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
Vue.mixin({
    methods: {
        $toast(
            icon,
            text) {
            Toast.fire({
                icon,
                text
            })
        },
        $fnError(msg) {
            this.$toast('error', msg)
        },
        $throwException() {
            this.$fnError('Erro interno')
        },
        $fnSuccess(msg) {
            this.$toast('success', msg)
        },
        $fnInfo(msg) {
            this.$toast('info', msg)
        }
    }
})
