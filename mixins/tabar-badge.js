// 导入辅助的函数
import {mapGetters} from 'vuex'

export default {
	onShow(){
		this.setBage()
	},
	computed:{
		// 映射为当前组件的计算属性
		...mapGetters('my_Cart',['total'])
	},
	methods:{
		setBage(){
			// 设置购物车的角标
			uni.setTabBarBadge({
				index:2,
				// text为字符串
				text:this.total+''
			})
		},
	},
	// 侦听器
	watch:{
		// 监听total的变化
		total(){
			this.setBage()
		}
	}
}
