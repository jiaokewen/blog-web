import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import * as R from '@/router/router-types'
import Form from '@/pages/content/Form'
import ContentManage from '@/pages/content/Manage'
import ContentAdd from '@/pages/content/Add'
import ContentEdit from '@/pages/content/Edit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/form',
          name: 'Form',
          component: Form
        },
        {
          path: R.kContentManage,
          name: 'ContentManage',
          component: ContentManage
        },
        {
          path: R.kContentAdd,
          name: 'ContentAdd',
          component: ContentAdd
        },
        {
          path: '/content/edit',
          name: 'ContentEdit',
          component: ContentEdit
        },
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
