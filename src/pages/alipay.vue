<template>
    <div>
        <orderlist title="订单支付">
            <template v-slot:order>
               <span> 谨防钓鱼链接、诈骗信息和电话</span>
            </template>
        </orderlist>
        <div class="ali" v-html="content">

        </div>
        <loading></loading>
    </div>
</template>

<script>
import loading from '@/components/loading';
import orderlist from '@/components/OrderHeader';
export default {
    name:'ali',
    data(){
        return{
            orderNo:this.$route.query.orderId,
            content:'',//支付宝的html内容
        }
    },
    components:{
        loading
    },
    mounted(){
        this.paySubmit();
        
    },
    methods:{
        paySubmit(){
            this.axios.post('/pay',{
                orderId:this.orderNo,
                orderName:'何俊星的钱包',
                amount:0.01,
                payType:1

            }).then((res)=>{
                this.content = res.content;
                // 跳转页面
                // 因为上面渲染支付宝html需要时间
                setTimeout(()=>{
                    document.forms[0].submit()
                },100)
            })
        }
    }


}
</script>