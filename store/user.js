export default {
	// 开启命名空间
	namespaced: true,
	// 存储数据
	state: () => ({
		// 地址
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		// 更新收货地址
		updataAddress(state, address) {
			state.address = address
			// 调用函数
			this.commit('my_User/saveAddress')
		},
		// 将地址存储到本地中
		saveAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
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
