<!-- 搜索页面的分包 -->
<template>
	<view>
		<!-- 搜索输入框 -->
		<view style="position: sticky;top: 0px; z-index: 99;">
			<uni-search-bar :radius="100" @input="searchInput" placeholder="请输入内容"></uni-search-bar>
		</view>
		<!-- 搜索结果展示 -->
		<view v-if="keyList.length!==0" style="padding: 0 5px;">
			<view @click="gotodetail(item)" v-for="(item,index) in keyList" :key='index' style="border-bottom: 1px solid #efefef; display: flex; justify-content: space-between;align-items: center;padding: 13px 0;font-size: 14px;">
				<!-- 超过长度设置为省略号text-overflow: ellipsis; -->
				<view style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{item.goods_name}}</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史区域 -->
		<view v-else style="padding: 0 5px;">
			<view style="display: flex;justify-content: space-between;height: 40px;align-items: center;border-bottom: 1px solid #efefef;">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="deleteHistory"></uni-icons>
			</view>
			<!-- 历史关键字 -->
			<view>
				<uni-tag @click="gotodetail2(item)" style=" margin-top: 5px; margin-right: 5px; font-size: 14px;" :text="item" v-for="(item,index) in historyList" :key='index'/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				// 搜索关键字
				keycode:'',
				keyList:[],
				historyList:[]
			};
		},
		onLoad(){
			// 获取本地的历史关键字
			this.historyList=JSON.parse(uni.getStorageSync('historyList') || '[]')
		},
		methods:{
			gotodetail2(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			},
			// 输入框的输入事件,e为用户输入的内容
			searchInput(e){
				clearTimeout(this.timer)
				// 设置防抖,如果500ms内没有触发该事件就会发送请求，如果触发了就会重新计算时间
				this.timer=setTimeout(()=>{
					this.keycode=e
					// console.log(e)
					this.getkeyList()
				}, 500);
			},
			async getkeyList(){
				if(this.keycode === ''){
					this.keyList=[]
					return
				} 
				// 发送请求
				const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keycode})
				if(res.meta.status !==200) return uni.$showMsg()
				this.keyList=res.message
				// 将关键字保存起来，set方法去重，from将其转化为数组
				this.historyList.unshift(this.keycode)
				// set将数组去重，from转化为数组
				this.historyList = Array.from(new Set(this.historyList))
				// 将历史记录保存在本地中
				uni.setStorageSync('historyList',JSON.stringify(this.historyList))
			},
			gotodetail(val){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+val.goods_id
				})
			},
			deleteHistory(){
				this.historyList=[]
				uni.setStorageSync('historyList','[]')
			}
		}
	}
</script>

<style lang="scss">

</style>
