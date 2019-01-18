import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Element from 'element-ui'

import '@/styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  render: h => h(App)
}).$mount(root)
