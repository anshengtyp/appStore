<!-- 搜索框的组件 -->
<template>
	<view @click="goto" class="topview" :style="{'background-color':bgcolor}">
		<view class="top2view" :style="{'border-radius':radius+'px'}">
			<icon style="margin: 0 3px;" type="search" size="16" />
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		// 属性
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {};
		},
		methods:{
			// 跳转到搜索页面
			goto(){
				// 调用自定义的事件，触发自定义组件绑定的事件
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.topview {
		height: 50px;
		// background-color: #c00000;
		display: flex;
		align-items: center;
		padding: 0 10px;

		.top2view {
			height: 36px;
			background-color: #FFFFFF;
			// border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
