<template>
    <div class="service">
        asd
        <div class="contianer">
            <ul>
                <li><span class="icon-setting"></span>预约维修服务</li>
                <li><span class="icon-7day"></span>7填无理由退货</li>
                <li><span class="icon-15day"></span>15天免费换货</li>
                <li><span class="icon-post"></span>满150元包邮</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .contianer{
        width: 1226px;
        padding: 10px 0;
        margin: 0 auto;
    }
    .contianer li{
        display: inline-block;
        /* 防止不同屏幕的尺寸 不能全显示 */
        width: 24.9%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 16px;
        
    }
    .contianer li span{
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: bottom;
        margin-right: 5px;
        background-size:25px ;
    }
    .icon-setting{
        background: url('../../public/imgs/icon-setting.png') no-repeat center;
    
    }
    .icon-7day{
 background: url('../../public/imgs/icon-7day.png') no-repeat center;
    }
    .icon-15day{
         background: url('../../public/imgs/icon-15day.png') no-repeat center;
    }
    .icon-post{
         background: url('../../public/imgs/icon-post.png') no-repeat center;
    }
</style>