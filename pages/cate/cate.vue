<template>
	<view>
		<!-- 搜索框组件 -->
		<my-search @click='gosearch'></my-search>
		<view style="display: flex;">
			<!-- 左侧滑动区域 -->
			<scroll-view  class="scroll-l" scroll-y :style="{height:wh+'px'}">
				<!-- block不会被渲染出来 -->
				<block v-for="(item,i) in cateList" :key="i">
					<view @click="activeChange(i)" :class='["left-scroll-item",i===active?"active":""]'>
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view :scroll-top="scrolltop" scroll-y="" :style="{height:wh+'px'}">
				<!-- 二级分类 -->
				<view v-for="(item,index) in cateList2" :key='index' style="text-align: center;">
					<!-- 二级标题 -->
					<view style="font-size: 14px;font-weight: bold;padding: 15px 0;">{{item.cat_name}}</view>
					<!-- 图片 -->
					<view style="display: flex;flex-wrap: wrap;">
						<view @click="to(item2.cat_id)" style="margin-bottom:10px;width: 33.33%; display: flex; flex-direction: column;justify-content: center;align-items: center;" v-for="(item2,index2) in item.children" :key='index2'>
							<image style="width: 60px;height: 60px;" :src="item2.cat_icon" mode="widthFix"></image>
							<text style="font-size: 12px;">{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import bageMix from '@/mixins/tabar-badge.js'
	export default {
		mixins:[bageMix],
		data() {
			return {
				// 当前设备可用的高度
				wh:0,
				// 一级分类
				cateList:[],
				// 二级分类
				cateList2:[],
				active:0,
				scrolltop:0
			};
		},
		onLoad(){
			// uni.getSystemInfoSync()获取屏幕的可使用宽度
			const info=uni.getSystemInfoSync()
			this.wh=info.windowHeight-50
			// console.log(this.wh)
			this.getcateList()
		},
		methods:{
			async getcateList(){
				const {data:res} =await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !==200) return uni.$showMsg()
				this.cateList=res.message
				this.cateList2=res.message[0].children
				// console.log(res)
			},
			// 点击的时候修改active的值
			activeChange(index){
				this.active=index
				// 动态重新为二级分类赋值
				this.cateList2=this.cateList[index].children
				// 0px和1px之间切换，因为不能赋一样的值
				this.scrolltop=this.scrolltop===0?1:0
			},
			to(id){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+id,
				})
			},
			gosearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-l{
	width: 120px;
	.left-scroll-item{
		background-color: #F7F7F7;
		line-height: 60px;
		font-size: 12px;
		text-align: center;
		// 表示既包含类名left-scroll-item和active
		&.active{
			background-color: #FFFFFF;
			position: relative;
			
			&::before{
				content: '';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #c00000;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0px;
			}
		}
	}
}
</style>
