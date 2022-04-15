export default {
	// 开启命名空间
	namespaced:true,
	// 存储数据
	state:()=>({
		// 购物车数据,拿到保存在cookie的数据
		cart:JSON.parse(uni.getStorageSync('cart') || '[]') 
	}),
	// 唯一可以来改变state数据的
	mutations:{
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		addToCart(state,goods){
			// 判断是否已经存在cart中
			const result= state.cart.find(x=> x.goods_id === goods.goods_id)
			// console.log(result)
			// 如果不存在
			if(!result){
				state.cart.push(goods)
			}else{
				// 将数目加一
				result.goods_count++
			}
			// 将最新数据保存,调用方法
			this.commit('my_Cart/saveToStorage')
			// console.log(state.cart)
		},
		// 更新商品的状态
		updataGoodsState(state,goods){
			const result = state.cart.find(x => x.goods_id === goods.goods_id)
			if(result){
				result.goods_state = goods.goods_state
			}
			this.commit('my_Cart/saveToStorage')
		},
		// 修改数量方法
		updataGoodsCount(state,goods){
			const result = state.cart.find(x => x.goods_id === goods.goods_id)
			if(result){
				result.goods_count = goods.goods_count
			}
			this.commit('my_Cart/saveToStorage')
		},
		// 删除对应的商品
		delGoods(state,goods_id){
			// 满足条件的对cart重新赋值
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('my_Cart/saveToStorage')
		},
		updataAllState(state,newstate){
			// 将传递过来的新状态赋值给每一个商品状态
			state.cart.forEach(x => x.goods_state=newstate)
			// 将最新的数据保存到本地
			this.commit('my_Cart/saveToStorage')
		}
	},
	// 类似于计算属性
	getters:{
		// 计算购物车的总数量
		total(state){
			let c=0
			state.cart.forEach(x=> c+=x.goods_count)
			// console.log(c)
			return c
		},
		// 统计选中状态总数量
		checkedCount(state){
			// total为返回的总数，0位total的初始值，item为当前遍历的对象
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count,0)
		},
		// 计算总价
		countGoods(state){
			// total为返回的总数，0位total的初始值，item为当前遍历的对象,同时保留两位小数
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += (item.goods_price*item.goods_count),0).toFixed(2)
		}
	},
}