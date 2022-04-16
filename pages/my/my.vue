<template>
	<view>
		<!-- 未登录 -->
		<my-login v-if="!token"></my-login>
		<!-- 登录 -->
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import bageMix from '@/mixins/tabar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[bageMix],
		data() {
			return {
				
			};
		},
		computed:{
			// 拿到用户模块的token信息
			...mapState('my_User',['token']),
		}
	}
</script>

<style lang="scss">

</style>
