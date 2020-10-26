// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import VueLazyLoad from 'vue-lazyload';
// import env from './env';

// const mock = false;
// if (mock) {
//     // import 是預編譯，会编译的时候就加入
//     // require 是用到再加载
//     require('@/mock/api.js')
// }

//根军前端的跨域方式调整
// 此处用代理，前后端域名一样，直接/API
// 如果是cors或jsonp，则写全地址
axios.defaults.baseURL = '/api';
// 后端返回时间,通常5~8S
axios.defaults.timeout = 8000;
// axios.defaults.baseURL = env.baseUrl;
// 1.接口错误拦截
axios.interceptors.response.use(function(response) {
        let res = response.data;
        let path = location.hash;
        if (res.status == 0) {
            // 状态正常，返回的数据
            return res.data;
        } else if (res.status == 10) {
            // 不能用路由，因为路由是挂在vm对象上的
            // 注意#
            if (path == '/#/index') {
                window.location.href = '/#/login'
            }
        } else {
            // 错误
            alert(res.msg);
            return Promise.reject(res)
        }
    })
    // 路由
Vue.use(VueAxios, axios);
// cookie
Vue.use(VueCookie);
// 懒加载
Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bubbles.svg'
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    // store,
    router,
    render: h => h(App),
}).$mount('#app')