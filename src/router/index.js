import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'
import JoinStation from '@/views/threesteps'
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
    path: '/joinStation',
    name: 'station',
    hidden: true,
    component: JoinStation,
    meta: {
      title: '入驻基站'
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
  // {
  //   path: '/introduction',
  //   component: Layout,
  //   redirect: '/introduction/index',
  //   // alwaysShow: true,
  //   meta: {
  //     icon: 'svg-aperture',
  //     title: '简述'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Introduction',
  //       component: () => import('@/views/introduction/index'),
  //       meta: {icon: 'svg-aperture', title: '简述'}
  //     }
  //   ]
  // },
  // {
  //   path: '/echarts',
  //   component: Layout,
  //   redirect: 'index',
  //   alwaysShow: true,
  //   meta: {
  //     title: '可视化',
  //     icon: 'svg-droplet'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: '数量统计',
  //       component: () => import('@/views/echarts'),
  //       meta: {title: '数量统计', icon: 'svg-heart'}
  //     }
  //   ]
  // },
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
  // {
  //   path: '/futures',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: {
  //     icon: 's-grid',
  //     title: '更多功能'
  //   },
  //   children: [
  //     {
  //       path: 'draggable',
  //       name: 'draggable',
  //       component: () => import('@/views/futures/draggable'),
  //       meta: {icon: 'thumb', title: '拖拽'}
  //     },
  //     {
  //       path: '/clipboard',
  //       name: 'clipBoard',
  //       component: () => import('@/views/clipboard'),
  //       meta: {title: '剪切板示例', icon: 'document'}
  //     }
  //   ]
  // }
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
    path: '/echarts',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'svg-droplet'
    },
    redirect: '/echarts/index',
    children: [
      {
        path: 'index',
        name: '数量统计',
        component: () => import('@/views/echarts'),
        meta: {title: '首页', icon: 'svg-heart'}
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    alwaysShow: false,
    meta: {
      icon: 'document',
      title: '首页'
    },
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/homepage/index'),
        name: '首页',
        meta: { title: '首页', icon: 's-home' }
      }
    ]
  },
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
      }
      // {
      //   path: 'export-excel',
      //   name: '导出表格',
      //   component: () => import('@/views/excel/export-excel'),
      //   meta: {icon: 'download', title: '导出表格'}
      // },
      // {
      //   path: 'upload-excel',
      //   name: '上传表格',
      //   component: () => import('@/views/excel/upload-excel'),
      //   meta: {icon: 'upload', title: '上传表格'}
      // },
      // // 放到 统计交易中 和 可视化一个目录
      // {
      //   path: 'merge-count',
      //   name: '合并&统计',
      //   component: () => import('@/views/excel/merge-count'),
      //   meta: {icon: 'upload', title: '合并&统计'}
      // },
      // {
      //   path: 'custom-design',
      //   name: '自定义表格',
      //   component: () => import('@/views/excel/custom-excel'),
      //   meta: {icon: 's-promotion', title: '自定义表格'}
      // }
    ]
  },
  {
    path: '/manufacturers',
    component: Layout,
    meta: {
      icon: 'svg-layers',
      title: '厂商管理'
    },
    children: [
      {
        path: 'index',
        name: 'Station',
        component: () => import('@/views/manufacturers/index'),
        meta: {icon: 's-promotion',title: '厂商管理'}
      }
    ]
  },
  {
    path: '/goods-of-station',
    component: Layout,
    meta: {
      icon: 'question',
      title: '基站经营物品'
    },
    redirect: '/goods-of-station/index',
    children: [
      {
        path: 'index',
        name: 'StationPeopleGoods',
        component: () => import('@/views/goods-of-station/index'),
        meta: {icon: 'guide', title: '基站经营物品'}
      }
    ]
  },
  {
    path: '/reservationManage',
    component: Layout,
    meta: {
      icon: 'svg-layers',
      title: '预约管理'
    },
    children: [
      {
        path: 'index',
        name: 'Reservation',
        component: () => import('@/views/reservation/index'),
        meta: {icon: 'star-on', title: '预约管理'}
      }
    ]
  },
  {
    path: '/transactionManage',
    component: Layout,
    meta: {
      icon: 'svg-layers',
      title: '交易管理'
    },
    children: [
      {
        path: 'index',
        name: 'Transaction',
        component: () => import('@/views/transaction/index'),
        meta: {icon: 'star-on', title: '交易管理'}
      }
    ]
  },
  {
    path: '/factorytransaction',
    component: Layout,
    meta: {
      icon: 'svg-layers',
      title: '厂商交易'
    },
    children: [
      {
        path: 'index',
        name: 'FactoryTransaction',
        component: () => import('@/views/factorytransaction/index'),
        meta: {icon: 's-promotion',title: '厂商交易'}
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
    redirect: '/nearBaseStation/index',
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
        name: '我的交易',
        meta: { title: '我的交易', icon: 'guide' }
      }
      // ,{
      //   path: 'goods-type',
      //   component: () => import('@/views/my-trade/goods-type'),
      //   name: '类别统计',
      //   meta: { title: '类别统计', icon: 'guide' }
      // }
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
        meta: { title: '我的预约', icon: 'star-on' }
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
  { path: '*', redirect: '/404', hidden: true }
]
