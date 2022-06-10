import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment';
import axios from 'axios';
import i18n from './i18n'
Vue.prototype.$moment = moment;

Vue.config.productionTip = false

const shipFakeCalculator = (weight)=>{
   let perTonne = 50000;
   let pricePerKilos = perTonne / 1000;
   let pricePerGrame = pricePerKilos / 1000;
   return weight * pricePerGrame;
}

Vue.prototype.$axios = axios;
Vue.prototype.$shipCalculator = shipFakeCalculator;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
