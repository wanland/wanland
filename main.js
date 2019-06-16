import Vue from 'vue'
import App from './App'
import api from './common/api'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()