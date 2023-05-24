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
            if (!error) {
                this.$fnError('Erro interno')
                return false
            }
            try {
                const { response } = error
                if (response.status === 401) {
                    this.setExpiredSession(true)
                }
                const { data } = response.data
                if (data) {
                    const errors = Object.keys(data)
                    this.$fnError(data[errors[0]])
                } else if (response.data && response.data.msg) {
                    this.$fnError(response.data.msg)
                }
            } catch (e) {
                this.$fnError(error)
            }
        },
        $fnSuccess(msg) {
            this.$toast('success', msg)
        },
        $fnInfo(msg) {
            this.$toast('info', msg)
        }
    }
})
