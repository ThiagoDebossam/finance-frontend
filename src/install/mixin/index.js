import Vue from 'vue'
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

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
    data () {
        return {
            required: [
                v => !!v || 'Campo obrigatório'
            ]
        }
    },
    methods: {
        ...mapActions(['setExpiredSession']),
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
        $throwException(error) {
            console.error(error)
            if (!error) {
                this.$fnError('Erro interno')
                return false
            }
            try {
                const { response } = error
                if (response.status === 401) {
                    this.setExpiredSession(true)
                } else if (response.status === 404) {
                    this.$fnError('Rota não encontrada')
                } else if (response.data && response.data.data) {
                    const { data } = response.data
                    const errors = Object.keys(data)
                    this.$fnError(data[errors[0]])
                } else if (response.data && response.data.msg) {
                    this.$fnError(response.data.msg)
                } else {
                    throw 1;
                }
            } catch (e) {
                this.$fnError('Erro interno!')
            }
        },
        $fnSuccess(msg) {
            this.$toast('success', msg)
        },
        $fnInfo(msg) {
            this.$toast('info', msg)
        },
        $message(message = 'OK', type = 'warning', showTitle = true) {
            Swal(showTitle ? 'Chronos+' : undefined, message, type || '')
        },
        $askBefore(
            fnConfirmation,
            fnCancel,
            title,
            text,
            confirmButtonText = 'Sim',
            cancelButtonText = 'Não',
            icon = 'warning') {
            Swal.fire({
                title,
                text,
                icon,
                confirmButtonText,
                cancelButtonText,
                showCancelButton: true,
                cancelButtonColor: '#c4c4c4',
                confirmButtonColor: '#3085d6',
                reverseButtons: true,
                showCloseButton: false,
                customClass: {
                    popup: 'swal-popup',
                    content: 'content-popup',
                    actions: 'actions-custom',
                    title: 'swal2-title ',
                    htmlContainer: 'swal2-htmlContainer'
                }

            }).then((result) => {
                if (result.value) {
                    fnConfirmation()
                } else {
                    if (typeof fnCancel === 'function') fnCancel()
                }
            })
        }
    }
})
