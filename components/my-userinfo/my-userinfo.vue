<template>
	<view>
		<!-- 用户信息 -->
		<view
			style="background-color: #c00000;display: flex;flex-direction: column;justify-content: center;align-items: center;height: 400rpx;">
			<image
				style="border-radius: 50%;width: 90px;height: 90px;border: 2px solid white; box-shadow: 0 1px 5px black;"
				:src="userInfo.avatarUrl"></image>
			<text style="margin-top: 15px;font-size: 18px;">{{userInfo.nickName || XXX}}</text>
		</view>
		<!-- 面板区域 -->
		<view style="margin-top: -10px;padding: 0 10px;">
			<!-- 第一个面板 -->
			<view
				style="background-color: white;display: flex;justify-content: space-between;padding: 0 10px;height: 60px;border-radius: 5px;">
				<view class="panle">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="panle">
					<text>12</text>
					<text>收藏的商品</text>
				</view>
				<view class="panle">
					<text>14</text>
					<text>关注的商品</text>
				</view>
				<view class="panle">
					<text>17</text>
					<text>足迹</text>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="item1">
				<text style="padding: 10px 0 20px 5px;">我的订单</text>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view class="item">
						<image src="../../static/images/icon1.png" style="width: 50px;height: 50px;"></image>
						<text>待付款</text>
					</view>
					<view class="item">
						<image src="../../static/images/icon2.png" style="width: 50px;height: 50px;"></image>
						<text>待收货</text>
					</view>
					<view class="item">
						<image src="../../static/images/icon3.png" style="width: 50px;height: 50px;"></image>
						<text>退款/退货</text>
					</view>
					<view class="item">
						<image src="../../static/images/icon4.png" style="width: 50px;height: 50px;"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="item1">
				<view class="item3" style="border-bottom: 1px solid #efefef;">
					<text>收货地址</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="item3" style="border-bottom: 1px solid #efefef;">
					<text>联系客服</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="item3" @click="unlogin">
					<text>退出登录</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		computed: {
			...mapState('my_User', ['userInfo'])
		},
		methods:{
			...mapMutations('my_User',['updatatoken','getuserInfo','updataAddress']),
			// 退出登录
			unlogin(){
				// 弹框提示
				uni.showModal({
					title:'提示',
					"content":'您确定要退出登录吗?',
					success:(res)=>{
						console.log(res)
						// 用户点击确定按钮
						if(res.confirm){
							// 将所有数据清空
							this.updatatoken('')
							this.getuserInfo({})
							this.updataAddress({})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.panle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.item1 {
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 10px;
		border-radius: 5px;
		margin-top: 10px;
	}

	.item {
		display: flex;
		flex-direction: column;
		padding-bottom: 10px;
		align-items: center;
	}

	.item3 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		padding: 10px 0;
	}
</style>
