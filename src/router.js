import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home.vue';
import Index from './pages/index.vue';
// import Product from './pages/product.vue';
// import Detail from './pages/detail.vue';
// import Cart from './pages/cart.vue';
// import Order from './pages/order.vue';
// import OrderList from './pages/orderList.vue';
// import Confirm from './pages/ordercomfirm.vue';
// import Pay from './pages/pay.vue';
// import Login from './pages/login.vue'
// import Alipay from './pages/alipay.vue';
Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            redirect: '/index',
            component: Home,
            children: [{
                // 子路由的视图和跟路由差不多
                path: 'index',
                name: 'index',
                component: Index
            }, {
                path: 'product/:id',
                name: 'product',
                component: ()=>import('./pages/product.vue')
            }, {
                path: 'detail/:id',
                name: 'detail',
                component: ()=>import('./pages/detail.vue')
            }]
        }, {
            // 购物车，购物车视图不一样，另起
            path: '/cart',
            name: 'cart',
            component: ()=>import('./pages/cart.vue')
        },
        {

            path: '/login',
            name: 'login',
            component: ()=>import('./pages/login.vue')
        },

        {
            // 订单路由
            path: '/order',
            name: 'order',
            component: ()=>import('./pages/order.vue'),
            children: [{
                path: 'list',
                name: 'order-list',
                component: ()=>import('./pages/orderList.vue')
            }, {
                path: 'confirm',
                name: 'order-confirm',
                component: ()=>import('./pages/ordercomfirm.vue')
            }, {
                path: 'pay',
                name: 'order-pay',
                component: ()=>import('./pages/pay.vue')
            }, {
                path: 'alipay',
                name: 'alipay',
                component: ()=>import('./pages/alipay.vue')
            }]
        }
    ]
})