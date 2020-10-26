<template>
    <div>
        <orderlist></orderlist>
        cart
        <navfooter></navfooter>
    </div>
</template>

<script>
import orderlist from '@/components/OrderHeader';
import navfooter from '@/components/NavFooter';
export default {
    name:'cart',
    components:{
        orderlist,
        navfooter
    }
}
</script>