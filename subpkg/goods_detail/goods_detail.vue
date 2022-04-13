<!-- 商品购买详情页 -->
<template>
	<!-- 防止页面闪烁的问题v-if="goodsinfo.goods_name" -->
	<view v-if="goodsinfo.goods_name" style="padding-bottom: 50px;">
		<!-- 商品详情页轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular
			style="height: 750rpx;">
			<swiper-item v-for="(item,index) in goodsinfo.pics" :key='index'>
				<image style="width: 100%;height: 100%" @click="proview(index)" :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<!-- 价格和商品详情区域 -->
		<view style="padding: 10px; padding-right: 0;">
			<!-- 价格区域 -->
			<view style="color: red;font-size: 18px;padding-bottom: 10px;">￥{{goodsinfo.goods_price}}</view>
			<!-- 信息和收藏区域 -->
			<view style="display: flex;justify-content: space-between;">
				<!--商品文字区域  -->
				<view style="font-size: 13px;padding-right: 10px;border-right: 3px solid #efefef;">
					{{goodsinfo.goods_name}}</view>
				<!-- 收藏区域 -->
				<view
					style="display: flex;flex-direction: column;width: 50px;justify-content: center;align-items: center;padding:0 10px;">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text style="font-size: 13px;color:#6A6A6A">收藏</text>
				</view>
			</view>
			<!-- 快递区域 -->
			<view style="font-size: 12px;color: #808080;padding: 10px 0;">快递:免运费</view>
		</view>
		<!-- 将html代码转化 -->
		<rich-text :nodes="goodsinfo.goods_introduce"></rich-text>
		<!-- 商品导航区域 -->
		<view class="goods-carts" style="position: fixed;bottom:0px;width: 100%;">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsinfo: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					// infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(data) {
			// 拿到上一个页面的参数
			this.getgoodsinfo(data.goods_id)
		},
		methods: {
			async getgoodsinfo(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: goods_id
				})
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				// 解决图片间隙的问题,将img属性添加block属性，因为图片是行内元素，默认垂直对齐方式是基线对齐所以会用间隙
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block"').replace(/.webp/g, '.jpg')

				this.goodsinfo = res.message
			},
			// 点击图片预览效果
			proview(i) {
				// 调用uni的接口实现预览
				uni.previewImage({
					// 当前图片的索引
					current: i,
					// 用来存放所有预览图片的地址,返回大图片的路径
					urls: this.goodsinfo.pics.map(s => s.pics_big)
				})
			},
			onClick(e){
				if(e.content.text == '购物车'){
					// 跳转到购物车页面
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(){
				
			}
			
		}
	}
</script>

<style lang="scss">

</style>
