<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login()">登录</a>
                    <a href="javascript:;" v-if="username" @click="logout()">退出</a>
                     <a href="/#/order/list" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goCart()"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="nav-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="nav-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul >
                                <li class="product" v-for="(item,index) in phoneList" :key="index">
                                    <!-- 用了v-bind，后面的双引号表示变量，此处要再用单引号表示字符串 -->
                                    <a :href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro_img">
                                            <img :src="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">
                                            {{item.name}}
                                        </div>
                                        <div class="pro_price">
                                            {{item.price | currency}}
                                        </div>
                                    </a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>Redmi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul >
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro_img">
                                            <!-- <img src="../../public/imgs/nav-img/nav-3-1.jpg" alt=""> -->
                                        </div>
                                        <div class="pro-name">
                                            小米CC9
                                        </div>
                                        <div class="pro_price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro_img">
                                            <!-- <img src="../../public/imgs/nav-img/nav-3-2.jpg" alt=""> -->
                                        </div>
                                        <div class="pro-name">
                                            小
                                        </div>
                                        <div class="pro_price">19元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro_img">
                                            <!-- <img src="../../public/imgs/nav-img/nav-3-3.png" alt=""> -->
                                        </div>
                                        <div class="pro-name">
                                            小米CC9
                                        </div>
                                        <div class="pro_price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro_img">
                                            <!-- <img src="../../public/imgs/item-box-1.png" alt=""> -->
                                        </div>
                                        <div class="pro-name">
                                            小
                                        </div>
                                        <div class="pro_price">19元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro_img">
                                            <!-- <img src="../../public/imgs/item-box-1.png" alt=""> -->
                                        </div>
                                        <div class="pro-name">
                                            小米CC9
                                        </div>
                                        <div class="pro_price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro_img">
                                            <!-- <img src="../../public/imgs/item-box-1.png" alt=""> -->
                                        </div>
                                        <div class="pro-name">
                                            小
                                        </div>
                                        <div class="pro_price">19元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="nav-search">
                    <div class="wrapper">
                        <input type="text">
                    <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
   import { Message } from 'element-ui';
export default {
    name:'navheader',
    data(){
        return{
            // vuex的username
            // username:this.$store.state.username,
            phoneList:[]
        }
    },
    filters:{
        currency(val){
            if(!val) return 0.00 + '元';
            return '¥ ' + val.toFixed(2) +' 元'
        }
    },
    computed:{
        // 异步
        // login頁面請求用戶数据需要时间，先渲染APP的组件（需要调用接口请求数据），然后是Navheader组件取值，
        // 所以，nav组件取值时是空的，然后才是APP调用VUEX数据；可用computed解决这个延迟，请求回来了才渲染
        username(){
            return this.$store.state.username;
        },
        cartCount(){
            return this.$store.state.cartCount
        }
    },
    mounted(){
        
        this.getProductList();
        
         if(this.$route.params && this.$route.params.from == 'login' ){
                this.getCartCount();
         }
         
    },
    methods:{
        getProductList(){
            this.axios.get('/products',{
                params:{
                    categoryId:'100012',                   
          }
        }).then((res)=>{
            if(res.list.length>6){
                this.phoneList = res.list.splice(0,6);
                // console.log(this.phoneList);
            }
        })
      },
      login(){
            this.$router.push('/login')
      },
    // 退出功能
    logout(){
        // 1.通知后台退出
        this.axios.post('/user/logout').then(()=>{
            Message.success('退出成功');
            // 2.清除cookie,-1立即过期
            this.$cookie.set('userId','',{expires:'-1'});
            //3. vuex
            this.$store.dispatch('saveUser','');
            this.$store.dispatch('saveCart','0')
        })
    },
    // 再次获取购物车数量
    getCartCount(){
      
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCart',res)
      })
    },
      goCart(){
        //   购物车点击 跳转路由
          this.$router.push('/cart');
      }
    }
}
</script>

<style scoped>

.header .nav-topbar{
        height: 39px;
        line-height: 39px;
        background-color: #333333;
        }
   .nav-topbar .container{
            width: 1226px;
            margin-right: auto;
            margin-left: auto; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            }
        .nav-topbar a{
                display: inline-block;
                color:#fff;
                margin-right:17px;
            }
       .header .my-cart{
             width: 110px;
            background-color: #FF6600;
            text-align: center;
            margin-right: 0;
            }
            .icon-cart{
                    display: inline-block;
                    width: 16px;
                    height: 12px;
                    margin-right: 4px;
                    background: url('../../public/imgs/icon-cart-checked.png') no-repeat;
                    background-size: contain;
                }
.nav-header  .container{
 position: relative;
           display: flex;
    justify-content: space-between;
    align-items: center;
            height: 112px;
            width: 1226px;
            margin-right: auto;
            margin-left: auto;}
     
            /* 中间 */
              .nav-menu{
            display: inline-block;
            width: 640px;
            padding-left: 200px;
            }
            .nav-menu .item-menu{
                 display: inline-block;
                color: #333;
                font-size: 16px;
                font-weight: bold;
                line-height: 112px;
                margin-right: 40px;
                }

              .item-menu  span{
                    cursor: pointer;
                    
                }
                .children{
                    position: absolute;
                    top:112px;
                    left: 0;
                    width: 1226px;
                     height: 0;
                   opacity: 0;
                    border-top: 1px solid #e5e5e5;
                    box-shadow: 0 7px 20px 0px rgba(0, 0, 0, 0.11);
                    z-index: 11;
                    background-color: #ffffff;
                    overflow: hidden;
                    transition: all 0.3s;
                }
                .item-menu:hover .children{
                    height: 220px;
                    opacity: 1;
                }
                .item-menu:hover span{
                    color:#FF6600
                }
            .children .product{
                position: relative;
                float: left;
                width: 16.66%;
                height: 220px;
                text-align: center;
               
                font-size: 12px;
                line-height: 12px;
                    
            }
            
            .children .product::after{
                position: absolute;
                right: 0;
                top: 28px;
                content: ' ';
                width: 1px;
                height: 100px;
                border-right:1px solid #ccc ;
            }
            .children .product:last-child::after{
                 border:0 ;
            }
            .product a{
                display: inline-block;
                width: 100%;
                height: 100%;
            }
            .product .pro_img{
                
                height: 137px;
            }
            .product img{
                 margin-top: 26px;
                height: 111px;
                width: auto;
            }
            .product .pro-name{
                font-size: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: #333333;
            }
            .product .pro_price{
                color: #FF6600;
            }

    .nav-search {
        width: 319px;}
        .wrapper{
        display: flex;
        box-sizing: border-box;
        height: 50px;
        align-items: center;
        border: 1px solid #E0E0E0;}
      .nav-search  input{
        border:none;
        width: 250px;
        height: 100%;
        border-right: 1px solid #e0e0e0;
        padding-left: 17px;
}
      .nav-search a{
        width: 18px;
        height: 18px;
        background: url('../../public/imgs/icon-search.png') no-repeat center center;
        background-size: contain;
        margin-left: 14px;
    }
</style>
