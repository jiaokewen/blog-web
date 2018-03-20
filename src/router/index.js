import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import * as R from '@/router/router-types'
import ContentManage from '@/pages/content/Manage'
import ContentAdd from '@/pages/content/Add'
import ContentEdit from '@/pages/content/Edit'
import ContentType from '@/pages/contentType/Manage'
import FriendManage from '@/pages/friend/Manage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        auth: true,
        bread: [{ name: '首页' }]
      },
      children: [
        {
          path: R.kContentManage,
          name: 'ContentManage',
          component: ContentManage,
          meta: {
            auth: true,
            func: 'content_manage',
            bread: [{ name: '首页', url: R.kIndex }, { name: '博客管理' }]
          }
        },
        {
          path: R.kContentAdd,
          name: 'ContentAdd',
          component: ContentAdd,
          meta: {
            auth: true,
            func: 'content_add',
            bread: [{ name: '首页', url: R.kIndex }, { name: '添加文章' }]
          }
        },
        {
          path: '/content/edit',
          name: 'ContentEdit',
          component: ContentEdit,
          meta: {
            auth: true,
            func: 'content_edit',
            bread: [{ name: '首页', url: R.kIndex }, { name: '编辑文章' }]
          }
        },
        {
          path: '/content/type',
          name: 'ContentType',
          component: ContentType,
          meta: {
            auth: true,
            func: 'content_edit',
            bread: [{ name: '首页', url: R.kIndex }, { name: '分类管理' }]
          }
        },
        {
          path: R.kFriendManage,
          name: 'FriendManage',
          component: FriendManage,
          meta: {
            auth: true,
            func: 'content_edit',
            bread: [{ name: '首页', url: R.kIndex }, { name: '友情链接' }]
          }
        },
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
