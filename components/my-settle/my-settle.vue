<!-- 结算组件 -->
<template>
	<view
		style="height: 50px;position: fixed;bottom: 0px;width: 100%;background-color:white;z-index: 9999;display: flex;justify-content:space-between;align-items: center;">
		<!-- 按钮区域 -->
		<view style="margin-left: 5px;display: flex;align-items: center;justify-content: center;">
			<radio @click="updataChecked" color="#c00000" :checked="isChecked" /><text>全选</text>
		</view>
		<!-- 合计 -->
		<view>
			<text>合计:</text>
			<text style="color: #c00000;">￥{{countGoods}}</text>
		</view>
		<!-- 结算按钮 -->
		<view @click="settlement"
			style="background-color: #c00000;height: 50px;color: white;line-height: 50px;padding: 0 10px;min-width: 100px;text-align: center;">
			结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				time: 3,
				once: null
			};
		},
		methods: {
			// 单选按钮的点击事件
			onclick(e) {
				// 获取父组件的数据
				this.isChecked()
				console.log(e)
			},
			...mapMutations('my_Cart', ['updataAllState']),
			...mapMutations('my_User', ['updataredirect']),
			updataChecked() {
				// this.isChecked的取反作为参数
				this.updataAllState(!this.isChecked)
			},
			// 结算按钮
			settlement() {
				// 判断是否有选择商品
				if (!this.checkedCount) return uni.$showMsg('请选择商品 !')
				// 判断是否选择收货地址
				if (!this.addstr) return uni.$showMsg('请选择收获地址 !')
				// 判断用户是否登录
				if (!this.token) return this.showtimecountdown()
				// 创建订单
				this.payorder()
				console.log('总价为:', this.countGoods)
			},
			// 展示倒计时的
			showtime(n) {
				uni.showToast({
					title: '请先登录再结算!' + n + '秒后将自动跳转到登录页面',
					icon: 'none',
					mask: true,
					duration: 1500
				})
			},
			// 倒计时
			showtimecountdown() {
				this.time = 3
				this.showtime(this.time)
				// 定时器对时间减一
				this.once = setInterval(() => {
					this.time--
					if (this.time <= 0) {
						clearInterval(this.once)
						// 跳转到我的tabar界面
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updataredirect({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showtime(this.time)
				}, 1000)
			},
			async payorder() {
				// 请求参数
				const info = {
					// order_price:countGoods,
					// 写死一个价格
					order_price: 0.001,
					consignee_addr: this.addstr,
					// map返回一个对象
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
					}))
				}
				// 发送请求
				const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create',info)
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg('创建订单失败!')
				const orderNumder=res.message.order_number
				console.log(orderNumder)
				// 发起订单预支付接口
				const {data: res1} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumder})
				console.log(res1)
				if(res1.meta.status !== 200) return uni.$showMsg('预付订单生成失败!')
				const payInfo = res1.message.pay
				// 发起微信请求
				const [err,succ]= await uni.requestPayment(payInfo)
				console.log(err)
				console.log(succ)
				if(err) return uni.$showMsg('订单未支付!')
				// 查询订单的状态
				const {data: res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumder})
				// 检测到订单未支付
				if(res3.meta.status !== 200) return uni.$showMsg('订单未支付!')
				// 订单支付完成
				uni.showToast({
					title:'支付完成',
					icon:'success'
				})
			}
		},
		computed: {
			// 将vuex的getter属性拿过来进行使用
			...mapGetters('my_User', ['addstr']),
			...mapState('my_User', ['token']),
			...mapState('my_Cart', ['cart']),
			// 将store的总价累加和结算累加映射过来
			...mapGetters('my_Cart', ['checkedCount', 'total', 'countGoods']),
			// 判断是否全选
			isChecked() {
				return this.total === this.checkedCount
			}
		}
	}
</script>

<style lang="scss">

</style>
