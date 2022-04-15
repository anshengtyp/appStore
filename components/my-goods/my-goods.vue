<template>
	<view>
		<view style="display: flex;padding: 10px 5px; border: 1px solid #efefef;">
			<!-- 左侧图片 -->
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<!-- 单选按钮 -->
				<radio @click="radioChangeHandler" v-if="showradio" :checked='item.goods_state'  color="#c00000"/>
				<image style="height: 100px;width: 100px;display: block;margin-right: 5px;" :src="item.goods_small_logo || defo"></image>
			</view>
			<!-- 右侧文字信息 -->
			<view style="font-size: 13px;display: flex;flex-direction: column;justify-content: space-between;">
				<!-- 商品标题 -->
				<view>{{item.goods_name}}</view>
				<!-- 价格 -->
				<!-- | 通过管道符调用过滤器 -->
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="color:red;font-size: 16px;">￥{{item.goods_price | toFiexd}}</view>
					<!--数字选择框 -->
					<uni-number-box :value="item.goods_count" v-if="showradio" @change="numchange" :min="1"></uni-number-box>
				</view>
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
			},
			showradio:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defo:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		methods:{
			radioChangeHandler(){
				// 子组件获取父组件的数据,radio-change触发@绑定的事件名称，并传递俩个参数
				this.$emit('radio-change',{
					goods_id:this.item.goods_id,
					// 将点击之后的数据取反返回给父组件
					goods_state:!this.item.goods_state
				})
			},
			numchange(val){
				this.$emit('num-change',{
					goods_id:this.item.goods_id,
					// 将点击之后的数据取反返回给父组件
					goods_count:+val  //+将val转化为数值类型
				})
			}
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
