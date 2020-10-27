import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutaions';
import actions from './action';

Vue.use(Vuex);

const state={
    // 用户名
    username:'',
    cartCount:0
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});