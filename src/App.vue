<template>
	<v-app>
		<re-login v-if="expiredSession"></re-login>
		<toolbar v-if="isLogged && !isLogin"></toolbar>
		<v-main>
			<router-view></router-view>

		</v-main>
	</v-app>
</template>

<script>

import Auth from '/src/auth'
import { mapGetters } from 'vuex'
import Toolbar from '/src/components/toolbar/Toolbar'
import ReLogin from '/src/components/re-login/ReLogin'
export default {
	name: "App",
	components: {
		Toolbar,
		ReLogin
	},
	data () {
		return {
		}
	},
	mounted () {
	},
	computed: {
		...mapGetters(['expiredSession']),
        isLogin () {
            return this.$route.name.includes('sign')
        },
		isLogged () {
			return Auth.isLogged()
		}
	}
}
</script>
<style lang="sass">@import "./assets/styles.scss"</style>