import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'
import nearBaseStation from '@/views/nearBaseStation'
import Layout from '@/layout/layout'

Vue.use(Router)

/**
 * 关于 route 的配置属性说明：
 *
 * alwaysShow: true       // if set true, will always show the root menu, whatever its child routes length
 *                        // if not set alwaysShow, only more than ont route under the children
 *                        // it will becomes nested mode, otherwise not show the root menu
 *                        // 如果设置为true,它将总是出现在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                        // 它的唯一子路由放到跟目录上来，而不显示它自己本身。
 *
 * hidden: true           // if set ture, 将不会出现在左侧菜单栏中
 */

/**
 * 基础路由： 任何角色都包含的路由
 * @type {Array}
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    hidden: true,
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    // hidden: true,
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/homepage'),
        meta: {icon: 's-home', title: '首页'}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: {
      icon: 'tickets',
      title: '个人中心'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/profile'),
        meta: {icon: 'warning', title: '个人中心'}
      }
    ]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    // alwaysShow: true,
    meta: {
      icon: 'svg-aperture',
      title: '简述'
    },
    children: [
      {
        path: 'index',
        name: 'Introduction',
        component: () => import('@/views/introduction/index'),
        meta: {icon: 'svg-aperture', title: '简述'}
      }
    ]
  },
  // 自定义组件 放到 用户预订基站时间
  {
    path: '/custom-component',
    component: Layout,
    meta: {
      icon: 'question',
      title: '自定义组件'
    },
    redirect: '/custom-component/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/custom-component/index'),
        meta: {icon: 'guide', title: '自定义组件'}
      }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: 'index',
    alwaysShow: true,
    meta: {
      title: '可视化',
      icon: 'svg-droplet'
    },
    children: [
      {
        path: 'index',
        name: '数量统计',
        component: () => import('@/views/echarts'),
        meta: {title: '数量统计', icon: 'svg-heart'}
      }
    ]
  },
  // {
  //   path: '/rich-editor',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: {
  //     icon: 's-order',
  //     title: '用户管理'
  //   },
  //   redirect: 'quill',
  //   children: [
  //     {
  //       path: 'quill',
  //       name: 'QuillEditor',
  //       component: () => import('@/views/user/index'),
  //       meta: {icon: 's-order', title: 'quill'}
  //     }
  //   ]
  // },
  {
    path: '/futures',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 's-grid',
      title: '更多功能'
    },
    children: [
      {
        path: 'draggable',
        name: 'draggable',
        component: () => import('@/views/futures/draggable'),
        meta: {icon: 'thumb', title: '拖拽'}
      },
      {
        path: '/clipboard',
        name: 'clipBoard',
        component: () => import('@/views/clipboard'),
        meta: {title: '剪切板示例', icon: 'document'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 动态路由： 根据用户角色
 * @type {Array}
 */
export const asyncRouterMap = [
  {
    path: '/userManage',
    component: Layout,
    redirect: '/user/common-user/index',
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 's-order'
    },
    children: [
      {
        path: 'common-user',
        component: () => import('@/views/user/common-user/index'),
        name: 'CommonUser',
        meta: { icon: 'menu', title: '普通用户管理' }
      },
      {
        path: 'station-user',
        component: () => import('@/views/user/station-user/index'),
        name: 'StationUser',
        meta: { icon: 'set-up', title: '基站用户管理' }
      }
    ]
  },
  {
    path: '/stationManage',
    component: Layout,
    meta: {
      icon: 'svg-layers',
      title: '基站管理'
    },
    children: [
      {
        path: 'index',
        name: 'Station',
        component: () => import('@/views/station/index'),
        meta: {icon: 'star-on', title: '基站管理'}
      }
    ]
  },
  {
    path: '/goodsManage',
    component: Layout,
    redirect: '/excel/export-excel',
    alwaysShow: true,
    meta: {
      title: '物品管理',
      icon: 'date'
    },
    children: [
      {
        path: 'dynamic-type',
        component: () => import('@/views/excel/dynamic-type/index'),
        name: 'DynamicType',
        meta: { icon: 'menu', title: '物品类型' }
      },
      {
        path: 'dynamic-table',
        component: () => import('@/views/excel/dynamic-table/index'),
        name: 'DynamicTable',
        meta: { icon: 'set-up', title: '物品详情' }
      },
      {
        path: 'export-excel',
        name: '导出表格',
        component: () => import('@/views/excel/export-excel'),
        meta: {icon: 'download', title: '导出表格'}
      },
      {
        path: 'upload-excel',
        name: '上传表格',
        component: () => import('@/views/excel/upload-excel'),
        meta: {icon: 'upload', title: '上传表格'}
      },
      // 放到 统计交易中 和 可视化一个目录
      {
        path: 'merge-count',
        name: '合并&统计',
        component: () => import('@/views/excel/merge-count'),
        meta: {icon: 'upload', title: '合并&统计'}
      },
      {
        path: 'custom-design',
        name: '自定义表格',
        component: () => import('@/views/excel/custom-excel'),
        meta: {icon: 's-promotion', title: '自定义表格'}
      }
    ]
  },
  {
    path: '/threesteps',
    component: Layout,
    redirect: '/threesteps/index',
    // alwaysShow: true,
    meta: {
      icon: 'svg-aperture',
      title: '基站三部曲'
    },
    children: [
      {
        path: 'index',
        name: 'ThreeSteps',
        component: () => import('@/views/threesteps/index'),
        meta: {icon: 'svg-aperture', title: '基站三部曲'}
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    meta: {
      icon: 'document',
      title: 'theme'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: '主题', icon: 'svg-pifu' }
      }
    ]
  },
  {
    path: '/nearBaseStation',
    component: Layout,
    alwaysShow: false,
    meta: {
      icon: 'document',
      title: '附件的基站'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/nearBaseStation/index'),
        name: '附件的基站',
        meta: { title: '附件的基站', icon: 'svg-pifu' }
      }
    ]
  },
  {
    path: '/nearBaseStation',
    component: Layout,
    alwaysShow: false,
    meta: {
      icon: 'document',
      title: '附件的基站'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/nearBaseStation/index'),
        name: '附件的基站',
        meta: { title: '附件的基站', icon: 'document' }
      }
    ]
  },
  {
    path: '/my-trade',
    component: Layout,
    alwaysShow: false,
    meta: {
      icon: 'guide',
      title: '我的交易'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/my-trade/index'),
        name: '流水统计',
        meta: { title: '流水统计', icon: 'guide' }
      },{
        path: 'goods-type',
        component: () => import('@/views/my-trade/goods-type'),
        name: '类别统计',
        meta: { title: '类别统计', icon: 'guide' }
      }
    ]
  },
  {
    path: '/my-booking',
    component: Layout,
    alwaysShow: false,
    meta: {
      icon: 'document',
      title: '我的预约'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/my-booking/index'),
        name: '我的预约',
        meta: { title: '我的预约', icon: 'svg-pifu' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
