import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import {Button, Upload, Dialog, Icon} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Icon)
// Vue.use(Message)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
