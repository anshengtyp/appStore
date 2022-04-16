export default {
	// 开启命名空间
	namespaced: true,
	// 存储数据
	state: () => ({
		// 地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token') || '',
		userInfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirect:null
	}),
	mutations: {
		updataredirect(state,info){
			state.redirect=info
			console.log(state.redirect)
		},
		// 更新收货地址
		updataAddress(state, address) {
			state.address = address
			// 调用函数
			this.commit('my_User/saveAddress')
		},
		// 将地址存储到本地中
		saveAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 将用户信息存储到本地中
		saveUserinfo(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
		},
		getuserInfo(state,info){
			state.userInfo=info
			this.commit('my_User/saveUserinfo')
		},
		updatatoken(state,token){
			state.token = token
			this.commit('my_User/savetoken')
		},
		savetoken(state){
			uni.setStorageSync('token', state.token)
		}
	},
	getters: {
		// 拼接地址的方法
		addstr(state){
			if(state.address.provinceName === '') return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}
