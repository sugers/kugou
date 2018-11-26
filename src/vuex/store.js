import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
 // 定义状态
  state: [

  ]
,
  mutations: {
    newIndex(state, hash) {

      state.push(hash)
    }
  }
})

export default store
