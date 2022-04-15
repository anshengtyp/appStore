<!-- 收获地址组件 -->
<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view  v-if="JSON.stringify(address) === '{}'" style="height: 90px; display: flex;justify-content:center;align-items: center;">
			<button @click="chooseAddress" type="primary" size="mini">+请选择收货地址</button>
		</view>
		<!-- 收货信息 -->
		<view v-else style="display: flex;flex-direction: column;font-size: 14px;" @click="chooseAddress">
			<view style="display: flex;justify-content: space-between;padding: 10px 10px;">
				<view>收货人：{{address.userName}}</view>
				<view>
					<text>电话：{{address.telNumber}}</text>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
			<view style="padding: 5px 10px;">
				<text>收货地址：{{addstr}}</text>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="../../static/images/cart_border@2x.png" style="height: 5px;display: block;width: 100%;"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			};
		},
		methods:{
			...mapMutations('my_User',['updataAddress']),
			async chooseAddress(){
				// 调用uni的收货地址api
				const [err,succ] = await uni.chooseAddress().catch(err => err)
				// console.log(succ)
				if(err === null && succ.errMsg === 'chooseAddress:ok'){
					// console.log(succ)
					// this.address= succ
					// 将地址存在vuex中
					this.updataAddress(succ)
				}
			}
		},
		computed:{
			// 将vuex的addres拿过来在当前页面使用
			...mapState('my_User',['address']),
			// 将vuex的getter属性拿过来进行使用
			...mapGetters('my_User',['addstr'])
		},	
	}
</script>

<style lang="scss">

</style>
