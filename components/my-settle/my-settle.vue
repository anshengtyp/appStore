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
		<view @click="settlement" style="background-color: #c00000;height: 50px;color: white;line-height: 50px;padding: 0 10px;min-width: 100px;text-align: center;">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		methods:{
			// 单选按钮的点击事件
			onclick(e){
				// 获取父组件的数据
				this.isChecked()
				console.log(e)
			},
			...mapMutations('my_Cart',['updataAllState']),
			updataChecked(){
				// this.isChecked的取反作为参数
				this.updataAllState(!this.isChecked)
			},
			// 结算按钮
			settlement(){
				// 判断是否有选择商品
				if(!this.checkedCount) return uni.$showMsg('请选择商品!')
				console.log('总价为:',this.countGoods)
			}
		},
		computed:{
			// 将store的总价累加和结算累加映射过来
			...mapGetters('my_Cart',['checkedCount','total','countGoods']),
			// 判断是否全选
			isChecked(){
				return this.total === this.checkedCount
			}
		}
	}
</script>

<style lang="scss">

</style>
