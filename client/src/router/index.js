import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Movielist from '../views/Movielist.vue'
import Movieclass from '../views/Movieclass.vue'
import Movieadd from '../views/Movieadd.vue'
import Userlist from '../views/Userlist.vue'
import InfoShow from '../views/InfoShow.vue'

const routes = [
  {
    path:'/',
    component:Index,
    children:[
      {
        path: 'movielist',
        name: 'Movielist',
        component: Movielist
      },
      {
        path:'movieclass',
        name: 'Movieclass',
        component:Movieclass
      },
      {
        path:'movieadd',
        name: 'Movieadd',
        component:Movieadd
      },
      {
        path:'userlist',
        name: 'Userlist',
        component:Userlist
      },
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('eleToken');
  // 去登录页或者注册页 不需要校验
  if (to.path === '/login' || to.path === '/register') {
    next();
  }
  if(token){
    next()
  }else{
  next('/login')
  }
})


export default router
