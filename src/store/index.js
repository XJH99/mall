import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state,payload) {
      //1.查找之前数组中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);

      //2.判断oldProduct
      if (oldProduct){
        oldProduct.count += 1;
      }else {
        payload.count = 1;
        state.cartList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
