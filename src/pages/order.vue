<template>
    <div>
    
        <orderlist></orderlist>
        <router-view></router-view>
        <navfooter></navfooter>
    </div>
</template>

<script>
import orderlist from '@/components/OrderHeader';
import navfooter from '@/components/NavFooter';
export default {
    name:'order',
    components:{
        orderlist,
        navfooter
    }
}
</script>