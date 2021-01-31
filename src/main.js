import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'

// import axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueI18n)

const i18n = new VueI18n({

locale: 'zh',// 定义默认语言为中文

messages : {

	'zh' : require('@/assets/languages/zh.json'),

	'en' : require('@/assets/languages/en.json')

	}

});


// Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
