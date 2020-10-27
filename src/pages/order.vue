<template>
    <div>
        
        <router-view></router-view>
        <servicebar></servicebar>
        <navfooter></navfooter>
    </div>
</template>

<script>

import navfooter from '@/components/NavFooter';
import servicebar from '@/components/serviceBar.vue';
export default {
    name:'order',
    data(){
        return{
            title:'',
            order:''
        }
    },
    components:{
       
        navfooter,
        servicebar
    },
    mounted(){
        // 根据路由跳转地址，orderheader组件的title，span内容作出更改
        
    }
}
</script>