import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home.vue';
import Index from './pages/index.vue';
import Product from './pages/product.vue';
import Detail from './pages/detail.vue';
import Cart from './pages/cart.vue';
import Order from './pages/order.vue';
import OrderList from './pages/orderList.vue';
import Confirm from './pages/ordercomfirm.vue';
import Pay from './pages/pay.vue';
import Login from './pages/login.vue'
import Alipay from './pages/alipay.vue';
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
                component: Product
            }, {
                path: 'detail/:id',
                name: 'detail',
                component: Detail
            }]
        }, {
            // 购物车，购物车视图不一样，另起
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {

            path: '/login',
            name: 'login',
            component: Login
        },

        {
            // 订单路由
            path: '/order',
            name: 'order',
            component: Order,
            children: [{
                path: 'list',
                name: 'order-list',
                component: OrderList
            }, {
                path: 'confirm',
                name: 'order-confirm',
                component: Confirm
            }, {
                path: 'pay',
                name: 'order-pay',
                component: Pay
            }, {
                path: 'alipay',
                name: 'alipay',
                component: Alipay
            }]
        }
    ]
})