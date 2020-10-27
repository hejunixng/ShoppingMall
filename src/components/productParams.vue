<template>
    <div class="pparams" :class="{'is_fixed':isfixed}">
        <div class="container">
            <div class="pro-title">
                {{title}}
            </div>
            <div class="pro-param">
                <a href="">概述</a><span>|</span>
                <a href="">参数</a><span>|</span>
                <a href="" class="comment">用户评价</a>
                 <slot name="buy"></slot>
            </div>
           
        </div>
    </div>
</template>

<script>
export default {
    name:'Productparams',
    props:{
        title:String
    },
    data(){
       return {
            isfixed:false
       }
    },
    mounted(){
        // 吸顶
        // DOM元素挂在完毕后，监听滑动事件
        window.addEventListener('scroll',this.initHeight);
        
    },
    methods:{
        initHeight(){
            // 兼容
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
           this.isfixed= scrollTop > 152?  true:false;
        }
    },
    // 销毁滚动事件
    destroyed(){
        window.removeEventListener('scroll',this.initHeight,false)
    }
}
</script>
<style scoped>
.pparams{
    z-index: 10;
}
    .container{
        width: 1226px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    /* 吸顶 */
    .is_fixed{
        position: fixed;
        width: 100%;
        top: 0;
        background-color: #fff;
        box-shadow: 0 5px 5px #ccc;
    }
    .pparams{
        height: 70px;
        line-height: 70px;
        border-top: 1px solid #e5e5e5;
    }
    .pro-title{
        font-size: 18px;
        color: #333;
        font-weight: bold;
    }
    .pro-param{
        font-size: 14px;
        
    }
    .pro-param a{
        color: #666;

    }
    .pro-param span{
        margin:0 10px;
    }
    .pro-param .comment{
        margin-right: 10px;
    }
</style>