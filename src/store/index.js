import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publicKey:localStorage.getItem('publicKey') || false,
    walletBalance:localStorage.getItem('walletBalance') || false,
    cart:[]
  },
  getters: {
  },
  mutations: {
    SET_PUBLIC_KEY(state,value)
    {
        state.publicKey = value;
        localStorage.setItem('publicKey', value);
    },
    ADD_TO_CART(state,value)
    {
      state.cart.push(value);
    },
    SET_WALLET_BALANCE(state,value)
    {
        state.walletBalance = value;
        localStorage.setItem('walletBalance', value);
    }
  },
  actions: {
    setPublicKey({commit}, value)
    {
      commit('SET_PUBLIC_KEY', value);
    },
    setWalletBalance({commit}, value)
    {
      commit('SET_WALLET_BALANCE', value);
    },
    addToCart({commit}, value)
    {
      commit('ADD_TO_CART', value)
    }
  },
  modules: {
  }
})
