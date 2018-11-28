import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
 // 定义状态
  state: {
    rankname:''
  }
,
  mutations: {
    newIndex(state, msg) {
      state.rankname=msg
    }
  }
})

export default store
