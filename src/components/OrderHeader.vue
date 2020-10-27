<template>
    <div class="order-header">
       <div class="container clearfix">
            <div class="nav-logo">
                 <a href="/#/index"></a>
               </div>
            <div class="title">
                <h2>{{title}} <slot name='order'></slot></h2>
            </div>
                <div class="username">
                    <a href="javascript:;">{{username}}</a>
                </div>
       </div>


    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name:'orderheader',
    props:{
        title:String
    },
    computed:{
        ...mapState(['username'])
    }

}
</script>

<style scoped>
 .order-header{
    padding:30px 0;
    border-bottom:2px solid #FF6600;
    }
 .nav-logo{
      float:left;
    }
.title,.username{
      display:inline-block;
      height:55px;
      line-height:55px;
    }
 .title{
      float:left;
      margin-left:54px;
 }
  .title h2{
        font-size:28px;
        color:#333333;
      }
  .title span{
        font-size:14px;
        margin-left:17px;
        color:#999999;
        font-weight:200;
      }
.username{
      float:right;
      
    }
 .username a{
        color:#666666;
        font-size:16px;
      }
</style>