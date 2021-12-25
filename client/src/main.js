import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("请求前");
    if (localStorage.eleToken) {
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    Message.error(error.response.data)
    const  {status } =   error.response;
    if (status == 401) {
      Message.error('token 过期')
      localStorage.removeItem('eleToken')
      router.push('/login')
    }

    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')