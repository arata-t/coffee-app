import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/index/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coffee_beans: []
  },
  mutations: {
    FETCH_BEANS(state, coffee_beans){
      state.coffee_beans = coffee_beans
    },
    ADD_COFFEE_BEAN(state, coffee_bean) {
      const coffee_beans = state.coffee_beans.concat(coffee_bean)
      state.coffee_beans = coffee_beans
    }
  },
  actions: {
    async fetchBeans({ commit }) {
      await axios().get('/coffee_beans')
      .then(res => {
        commit('FETCH_BEANS', res.data)
      })
      .catch(e => console.log(e))
    },
    async addCoffeeBean({commit}, coffee_bean) {
      const res = await axios().post('/coffee_beans', coffee_bean)
      const savedCoffeeBean = res.data
      commit('ADD_COFFEE_BEAN', savedCoffeeBean)
      return savedCoffeeBean
    }
  },
})
