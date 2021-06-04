import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios  from 'axios';
import VueAxios from 'vue-axios'; 
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import animated from 'animate.css'
import './assets/css/global.css';
import './assets/font/icon.js'
axios.defaults.baseURL='http://www.xwsysapi.com/index/';
createApp(App).use(VueAxios,axios).use(store).use(ElementPlus).use(store).use(router).use(animated).mount("#app");

