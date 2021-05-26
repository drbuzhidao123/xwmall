import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios  from 'axios';
import VueAxios from 'vue-axios'; 
import animated from 'animate.css'
import './assets/css/global.css';
import './assets/font/icon.js'
axios.defaults.baseURL='http://www.xwsysapi.com/index/';
// 添加请求拦截器，在请求头中加token
/*axios.interceptors.request.use(config => { 
        config.headers.Authorization = window.sessionStorage.getItem('token');
        return config;
    },
    error => {
      return Promise.reject(error);
    });*/
createApp(App).use(VueAxios,axios).use(store).use(router).use(animated).mount("#app");
