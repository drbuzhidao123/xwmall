import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import Product from "../views/Product.vue";
import Detail from "../views/Detail.vue";
import Cart from "../views/Cart.vue";
import Order from "../views/Order.vue";
import OrderConfirm from "../views/OrderConfirm.vue";
import OrderList from "../views/OrderList.vue";
import OrderPay from "../views/OrderPay.vue";
import User from "../views/User.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: '/index',
    children: [
      {
        path: "/index",
        name: "index",
        component: Index
      },
      {
        path: "/product",
        name: "product",
        component: Product
      },
      {
        path: "/detail",
        name: "detail",
        component: Detail
      },
      {
        path: "/user",
        name: "user",
        component:User
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    children: [
      {
        path: "/orderConfirm",
        name: "orderConfirm",
        component: OrderConfirm
      },
      {
        path: "/orderList",
        name: "orderList",
        component: OrderList
      },
      {
        path: "/orderPay",
        name: "orderPay",
        component: OrderPay
      },
    ]
  },
  

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  //访问用户模块，购物车模块的时候如果没有token,就跳到登录界面
  if (to.path == '/user'||to.path == '/cart'||to.path == '/orderConfirm'||to.path == '/orderList'||to.path == '/orderPay') {
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr){
      return next('/login');   
    }
  };

  next();

})

export default router;