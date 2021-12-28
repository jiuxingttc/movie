import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Movielist from '../views/Movielist.vue'
import Movieclass from '../views/Movieclass.vue'
import Movieadd from '../views/Movieadd.vue'
import Movie from '../views/Movie.vue'
import Userlist from '../views/Userlist.vue'
import Userinfo from '../views/Userinfo.vue'

const routes = [
  {
    path:'/',
    component:Index,
    redirect:'/home',
    children:[
      {
        path: 'home',
        name: 'home',
        component: Home
      },
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
        path:'movie',
        name: 'Movie',
        component:Movie
      },
      {
        path:'userlist',
        name: 'Userlist',
        component:Userlist
      },
      {
        path: 'userinfo',
        name: 'userinfo',
        component: Userinfo
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
