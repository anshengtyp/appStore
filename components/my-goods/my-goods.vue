<template>
	<view>
		<view style="display: flex;padding: 10px 5px; border: 1px solid #efefef;">
			<!-- 左侧图片 -->
			<view>
				<image style="height: 100px;width: 100px;display: block;margin-right: 5px;" :src="item.goods_small_logo || defo"></image>
			</view>
			<!-- 右侧文字信息 -->
			<view style="font-size: 13px;display: flex;flex-direction: column;justify-content: space-between;">
				<!-- 商品标题 -->
				<view>{{item.goods_name}}</view>
				<!-- 价格 -->
				<!-- | 通过管道符调用过滤器 -->
				<view style="color:red;font-size: 16px;">￥{{item.goods_price | toFiexd}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				defo:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		// 过滤器
		filters:{
			toFiexd(num){
				// 过滤器实现添加俩位小数点，toFixed实现保留俩位小数
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">

</style>
