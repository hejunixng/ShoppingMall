<template>
    <div class="nodata">
        <img src="/imgs/icon-no-data.png" alt="">
        <p>当前订单暂无记录</p>
        </div>    
</template>

<script>
export default {
    name:'nodata'
}
</script>

<style scoped>
.nodata{
    text-align: center;
    font-size: 20px;
    color: #999;
    padding: 30px 0;
}
img{
    width: 240px;
    height: 180px;
    margin-bottom: 30px 0;
}
</style>