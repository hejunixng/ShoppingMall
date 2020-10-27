<template>
  <div>
     
    <navh></navh>
    <!-- 下面的路由容器是给 重定向到inbdex -->
    <!-- <swi></swi> -->
    <router-view></router-view>
    <navf> </navf> 
  </div>
</template>

<script>
import navh from '../components/NavHeader';
import navf from '@/components/NavFooter.vue';
import swi from '../components/swip';
export default {
    name:'nav-home',
    components:{
        navh,
        navf,
        swi
    }
}
</script>