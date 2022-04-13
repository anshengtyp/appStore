<!-- 首页、分类页面，搜索页面可以进入商品详情页分包 -->
<template>
	<view>
		<!-- 商品详情页 -->
		<view>
			<view v-for="(item,index) in goods_list" :key="index" @click="gotoDetail(item)">
				<!-- 自定义组件 -->
				<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 判断是否请求完成
				isloading:false,
				goods_list:[],
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				total:0,
			};
		},
		onLoad(data){
			// console.log(this.queryObj)
			this.queryObj.query=data.query || ''
			this.queryObj.cid=data.cid || ''
			this.getgoods_list()
		},
		methods:{
			async getgoods_list(cb){
				// 正在请求
				this.isloading=true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				// 没有请求数据
				this.isloading=false
				cb && cb()
				// console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				// 为数据赋值,将旧数据和新数据合并
				this.goods_list =[...this.goods_list,...res.message.goods]
				this.total = res.message.total
			},
			// 官方的下拉刷新事件
			onPullDownRefresh(){
				// 重置数据
				this.total=0
				this.queryObj.pagenum=1
				this.isloading=false
				this.goods_list=[]
				this.getgoods_list(()=>uni.stopPullDownRefresh())
			},
			// 官方的上拉触底事件
			onReachBottom(){
				// 判断所有数据是否请求完成
				if(this.queryObj.pagesize*this.queryObj.pagenum >=this.total) return uni.$showMsg('到底啦！')
				// 判断是否在发送请求
				if(this.isloading) return
				this.queryObj.pagesize+=1
				this.getgoods_list()
			},
			// 列表的跳转
			gotoDetail(val){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+val.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
