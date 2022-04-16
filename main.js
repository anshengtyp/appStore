// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

// 导入发送请求的包
import {
	$http
} from '@escook/request-miniprogram'

// 配置请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 挂载到uni对象上
uni.$http = $http

// 数据加载失败的提示，将其挂载在uni上
uni.$showMsg = function(title = '数据加载失败') {
	uni.showToast({
		title: title,
		icon: 'none'
	})
}

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "加载中..."
	})
	// console.log(options)
	// 判断请求的地址是否为有权限的地址
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加认证字段
		options.header = {
			Authorization: store.state.my_User.token
		}
	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	// 将store挂载为vue的实例对象
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
