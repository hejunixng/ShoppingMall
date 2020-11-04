<template>
    <div class="footer">
       <div class="footer-logo">
            <img src="../../public/imgs/logo-footer.png" alt="">
            <p>小米商城</p>
        </div>
        <div class="footer-info">
            <a href="https://www.baidu.com" target="_blank">购物商城</a><span>|</span>
            <a href="https://www.baidu.com" target="_blank">何俊星VUE</a><span>|</span>
            <a href="https://www.baidu.com" target="_blank">何俊星VUE</a><span>|</span>
             <a href="https://www.baidu.com" target="_blank">购物商城</a>
        </div>
        <div class="copyright">
            copyright @2020XXXX<span>github.com/hejunixng</span>XXXXXXX
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-footer'
}
</script>

<style scoped>
    .footer{
        height: 234px;
        border-top: 4px solid #ff6600;
        background-color: #333;
        color: #999;
        font-size: 16px;
        text-align: center;
    }
    .footer .footer-logo{
        margin: 46px 0 31px;
    }
    .footer-logo img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
    }
    .footer-info{
        margin-bottom: 10px;
    }
    .footer-info a{
        color: #999;
        margin:0 10px;
    }
    .copyright span{
        color:#ff6600   
    }
</style>