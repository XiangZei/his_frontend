import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',component: ()=>import('@/views/login/index'), hidden:true
    },
    {path:'/404',component:()=>import("@/views/404")},
    {
      path: '/admain',
      // redirect:'/admain/regis',
      name: 'admain',
      meta:{requireAuth:true},
      component: () => import('@/views/index'),
      children:[
        {
          path:'regis',
          name:'regis',
          meta:{requireAuth:true},
          component:()=>import('@/views/registration/regis')
        },
        {
          path:'withdraw_regis',
          name:'withdraw_regis',
          meta:{requireAuth:true},
          component:()=>import('@/views/registration/withdraw_regis')
        },
        {
          path:'pay',
          name:'pay',
          meta:{requireAuth:true},
          component:()=>import('@/views/registration/pay')
        },
        {
          path:'refund',
          name:'refund',
          meta:{requireAuth:true},
          component:()=>import('@/views/registration/refund')
        },
        {
          path:'diagnose',
          name:'diagnose',
          meta:{requireAuth:true},
          component:()=>import('@/views/doctor/diagnose')
        },
        {
          path:'medicine',
          name:'medicine',
          meta:{requireAuth:true},
          component:()=>import('@/views/medicine/medicine')
        }
      ]
    },
    {path:'*',redirect:'/404',hidden:true}
  ]
})

