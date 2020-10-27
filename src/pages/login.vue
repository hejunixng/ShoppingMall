<template>
    <div class="login">
       <div class="container">
              <a href="/#/index">
                  <img src="/imgs/login-logo.png" alt="">
                  </a>     
       </div>
       <div class="wraper">
           <div class="container">
               <div class="login-form">
                   <h3 class="des"> <span class="checked">账号登录</span><span class="midd">|</span><span>扫码登录</span></h3>
                  <div class="login-input">
                      <input type="text" placeholder="请输入帐号" v-model="username">
                  </div>
                   <div class="login-input">
                      <input type="password" placeholder="请输入密码"  v-model="password">
                  </div>
                  <div class="btn-box">
                      <a href="javascript:;" class="btn" @click="login()">登录</a>
                  </div>
                  <div class="login-tips">
                      <a href="javascript:;" class="msg">手机短信登录/注册</a>
                      <a href="javascript:;" class="reg" @click="register()">立即注册<span>|</span>忘记密码</a>
                  </div>
               </div>
               
           </div>
       </div>
       <div class="login-footer">
            <div class="container">
                <div class="link">
                       <a href="javascript:;">小米商城主页</a><span>|</span>
                       <a href="javascript:;">小米手机主页</a><span>|</span>
                       <a href="javascript:;">小米家电主页</a><span>|</span>
                       <a href="javascript:;">小米生活主页</a>
                   </div>
                 <p class="copyright">Copyright ©2019 mi.fans.com All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import { Message } from 'element-ui';
export default {
    name:'login',
    data(){
      return {
        username:'',
        password:'',
        // 根据id验证登录信息
        usrId:''
      }

    } ,
    methods:{
        
        login(){
            let {username,password} =this;
            this.axios.post('/user/login',{
                username,
                password
            }).then((res)=>{
                // 报错信息会被axios响应拦截
                // 此时已经验证完毕
                // 1.vue-cookie
        this.$cookie.set('userId',res.id,{expires:'session'})
        // 2.vuex用户登录状态
        this.$store.dispatch('saveUser',res.username);
            // 3.跳转
                this.$router.push({
                    name:'index',
                    params:{
                        from:'login'
                    }
                });
            })
        },
        register(){
            this.axios.post('/user/login',{
                username:'admin',
                password:'admin',
                emial:'admin@163.com'
            }).then((res)=>{
                // 报错信息会被axios响应拦截
                // 此时已经验证完毕
               Message.success('success')
            })
        }
        
    }  
}
</script>

<style scoped>
.container{
    width: 1226px;
     height:113px;
     margin: 0 auto;
}
.container a img{
    height: 100%;
}
.wraper{
    background: url('/imgs/login-bg.jpg') no-repeat center;
    /* background-size: contain; */
}
.wraper .container{
    position: relative;
   height:576px;
    margin: 0 auto;
}
.login-form{
    position:absolute;
    right: 0px;
    top: 37px;
    width:410px;
    height:510px;
    box-sizing: border-box;
    padding: 0 31px;
    background-color: #fff;
}
.des{
    height: 23px;
    font-size: 24px;
    line-height: 23px;
    text-align: center;
    margin: 40px auto 49px;
}
.des .checked{
    color:#FF6600;
}
.midd{
    font-size: 30px;
    margin: 0 32px;
}
.login-input{
          width:348px;
          height:50px;
          
          margin-bottom:20px;
}
.login-input input{
    width: 100%;
    height: 100%;
     border:1px solid #E5E5E5;
     box-sizing: border-box;
     padding:0 18px;
}


.btn-box a{
     width: 100%;
   height: 50px;
     
     line-height: 50px;
      font-size:18px;
      margin: 10px 0;
     
}
.login-tips{
    display: flex;
    justify-content: space-between;
     font-size:14px;
     
} 
.login-tips .msg{
    color:#FF6600;
}
.login-tips .reg{
     color:#999999;
}
.reg span{
    margin: 0 7px;
}
.login-footer {
    height:100px;
    padding-top:60px;
    font-size:16px;
     color:#999999;
    text-align:center;
}

.login-footer span{
  overflow: hidden;  margin:0 10px;
}

.login-footer a{
     font-size:18px;
    color:#999999;
}
.copyright{
      margin-top:13px;
    }
</style>