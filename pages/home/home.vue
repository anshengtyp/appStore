<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper indicator-dots autoplay :interval="3000" :duration='1000' circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<!-- 跳转到商品详情页，并传参 -->
				<navigator :url='"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id'>
					<image :src="item.image_src" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="cateview">
			<view class="cateview-item" v-for="(item,index) in cateList" :key='index' @click="tocateDetail(item.name)">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view v-for="(item,index) in floorList" :key='index'>
			<view>
				<image :src="item.floor_title.image_src" style="width: 100%;height: 60rpx;"></image>
			</view>
			<!-- 图片区域 -->
			<view style="display: flex;">
				<!-- 左侧图片 -->
				<view>
					<image :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix" :src="item.product_list[0].image_src"></image>
				</view>
				<!-- 右侧图片 -->
				<view style="display: flex; flex-wrap: wrap;">
					<view  v-for="(item2,index2) in item.product_list" :key='index2'>
						<!-- 做图片页面的跳转 -->
						<navigator :url="item2.url">
							<image class="floorrigth" :src="item2.image_src"  :style="{width:item2.image_width+'rpx'}" mode="widthFix" v-if="index2!==0"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数组
				swiperList:[],
				// 分类导航数据
				cateList:[],
				// 楼层数据
				floorList:[],
			};
		},
		onLoad(){
			this.getSwiper()
			this.getcateList()
			this.getfloorList()
		},
		methods:{
			// 发送请求获取轮播图的函数
			async getSwiper(){
				// 返回一个promise对象
				const  {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList=res.message
			},
			async getcateList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
				// console.log(res)
				if(res.meta.status !==200) return uni.$showMsg()
				this.cateList=res.message
			},
			tocateDetail(val){
				// 判断点击的是哪一个
				if(val === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getfloorList(){
				const {data: res} =await uni.$http.get('/api/public/v1/home/floordata')
				// console.log(res)
				if(res.meta.status !==200) return uni.$showMsg()
				// 对跳转的地址进行处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						// 自定义属性，该属性将作为res的属性一起赋值给floorList
						prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.message
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	
	swiper-item,image{
		width: 100%;
		height: 100%;
	}
}
.cateview{
	text-align: center;
	margin: 20rpx 0;
	width: 100%;
	// background-color: red;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	.cateview-item{
		height: 100%;
		width: 25%;
		image{
			width: 80%;
		}
	}
}
.floorrigth{
	border-radius: 10rpx;
	margin: 0 10rpx;
}
</style>
