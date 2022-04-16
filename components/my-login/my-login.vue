<!-- 登录组件 -->
<template>
	<view>
		<view style="display: flex;flex-direction: column; align-items: center;margin-top: 35%;">
			<uni-icons color="#afafaf" type="contact-filled" size="120"></uni-icons>
			<!-- getUserInfo获取用户信息 -->
			<button @click="getuser" style="background-color: #c00000;color: white;border-radius: 100px;width: 90%;">一键登录</button>
			<view style="font-size: 14px; color: #999999;margin-top: 15px;">登录尽享更多权益</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods:{
			...mapMutations('my_User',['getuserInfo','updatatoken','updataredirect']),
			// 获取 微信用户基本信息
			async getuser(){
				// 调用获取用户信息的接口
				uni.getUserProfile({
					desc:'测试',
					success:(res)=> {
						// console.log(res)
						this.getuserInfo(res.userInfo)
						// 将数据传递过去用于发送请求
						this.getToken(res)
					}
				})
			},
			async getToken(info){
				const [err ,res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败!')
				// console.log(res)
				// 准备参数对象
				const query={
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				// console.log(query)
				// 发送请求拿到token
				const {data:result} =await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// console.log(result)
				// if(result.meta.status !== 200) return uni.$showMsg('登录失败!')
				uni.$showMsg('登录成功!')
				// 接口问题，需要把人员加入到后台
				// this.updatatoken(result.message.token)
				this.updatatoken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				this.back()
			},
			back(){
				if(this.redirect && this.redirect.openType === 'switchTab'){
					// 跳转回去
					uni.switchTab({
						url:this.redirect.from,
						complete:()=>{
							// 将数据清空
							this.updataredirect(null)
						}
					})
				}
			}
		},
		computed:{
			...mapState('my_User',['redirect'])
		}
	}
</script>

<style lang="scss">

</style>
