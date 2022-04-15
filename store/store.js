// vuex数据
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车模块
import Cart from '@/store/cart.js'
import User from '@/store/user.js'

Vue.use(Vuex)

// 创建vuex实例对象

const store=new Vuex.Store({
	// 需要挂载的模块
	modules:{
		'my_Cart':Cart,
		'my_User':User
	}
})

export default store


