import Vue from 'vue'
import Router from 'vue-router'
import kmcjLayout from '@/views/kmcj/layout/index'
import cjd from '@/views/kmcj/cjd/index'

Vue.use(Router)

let constantRouterMap = [
  {
    path: '/kmcj',
    component: kmcjLayout,
    hidden: true,
    children: [{
      path: '/cjd',
      component: cjd
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
