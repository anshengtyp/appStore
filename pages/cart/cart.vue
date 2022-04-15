<!-- tabar购物车页面 -->
<template>
	<view>
		<view v-if="cart.length === 0" style="display: flex;justify-content: center;margin-top: 200rpx;">
			<image src="../../static/images/zhanwu.png" mode="widthFix"></image>
		</view>
		<!-- 购物车标题 -->
		<view v-else style="padding-bottom: 50px;">
			<!-- 我的地址组件 -->
			<my-address></my-address>
			<view style="display: flex;align-items: center;height: 40px;padding-left: 5px;border-bottom: 1px solid #efefef;">
				<!-- 左侧图标 -->
				<uni-icons type="shop-filled" size="25"></uni-icons>
				<!-- 文字 -->
				<text style="font-size: 14px;margin-left: 10px;">购物车</text>
			</view>
			<!-- 滑动效果 -->
			<uni-swipe-action>
				<!-- 商品列表区域 -->
				<block v-for="(item,index) in cart" :key='index'>
					<uni-swipe-action-item :right-options="options" @click="deletegoods(item)">
						<my-goods :showradio='true' :item="item" @radio-change='radioChangeHandler'
							@num-change='numchange'>
						</my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<!-- 结算组件 -->
			<my-settle></my-settle>
		</view>
	</view>
</template>

<script>
	import bageMix from '@/mixins/tabar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		// 挂载
		mixins: [bageMix],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F56C6C'
					}
				}],
			};
		},
		methods: {
			// 将store更新状态的方法映射过来
			...mapMutations('my_Cart', ['updataGoodsState', 'updataGoodsCount', 'delGoods']),
			// 购物车单选按钮改变事件
			radioChangeHandler(e) {
				// e接收子组件传递过来的俩个参数
				// console.log(e)
				this.updataGoodsState(e)
			},
			numchange(e) {
				// console.log(e)
				this.updataGoodsCount(e)
			},
			// 点击删除购物车商品
			deletegoods(val) {
				uni.showModal({
					title: "提示",
					content: '你确定删除该商品吗?',
					success: res => {
						// 删除cart里面对应的数据
						if (res.confirm) this.delGoods(val.goods_id)
					}
				})
			}
		},
		computed: {
			// 拿到vuex的数据
			...mapState('my_Cart', ['cart'])
		},
	}
</script>

<style lang="scss">

</style>
