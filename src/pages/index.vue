<template>
    <div class="index">
        <div class="contianer">
            <div class="nav-menu">
                <ul class="menu-warp">
                    <li class="menu-item ili"><a href="javascript:;"  @click="mymove">手机 电话卡</a>
                    </li>
                    <div class="warp-children" >
                            <ul v-for="(item,index) in menuProduct" :key="index">
                                <li v-for="(sub,j) in item" :key="j">
                                    <a :href="sub?'/#/product/'+sub.id:''" >
                                        <img :src="sub? sub.img: '/imgs/item-box-1.png'" alt="">
                                        {{sub.name? sub.name:'小米CC'}}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    <li class="menu-item"><a href="javascript:;">电视 盒子</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                    <li class="menu-item"><a href="javascript:;">笔记本 平板</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                    <li class="menu-item"><a href="javascript:;">家电 插线板</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                    <li class="menu-item"><a href="javascript:;">出行 穿戴</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                    <li class="menu-item"><a href="javascript:;">智能 路由器</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                    <li class="menu-item"><a href="javascript:;">电源 配件</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                    <li class="menu-item"><a href="javascript:;">生活 箱包</a>
                        <!-- <div class="warp-children"></div> -->
                    </li>
                </ul>
            </div>
            <!-- 轮播 -->
            <div class="swiper-box">

                <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(item,index) in slideList" :key="index">
                   <a :href="'/#/product/'+item.id" >
                       
                       <img :src="item.img" alt="">
                     
                   </a>

                </swiper-slide>
               <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
             <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        </div>
            <!-- 轮播 -->
            <!-- 广告位 -->
            
            <div class="adv-box">
                <a :href="'/#/product/'+item.id" v-for="(item,index) in advList" :key="index">
                    <!-- 直接把： v-bind换成 v-lazy -->
                    <!-- <img :src="item.img" alt=""> -->
                    <img v-lazy="item.img" alt="">
                </a>
            </div>
            <div class="banner">
                <a href="/#/product/30">
                    <img src="/imgs/banner-1.png" alt="">
                </a>
            </div>
            
        </div>
        <div class="product-box">
                <div class="contianer">
                    <h2>手机</h2>
                    <div class="wraper">
                        <div class="banner-left">
                            <a href="/#/product/35">
                                <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
                            </a>    
                        </div>   
                        <div class="list-box">
                            <div class="list" v-for="(item,i) in phoneList" :key="i">
                                <div class="item " v-for="(pro,j) in item" :key="j">
                                    <span :class="{'new-pro':j%2==0}">新品</span>
                                    <div class="img">
                                        <img v-lazy="pro.mainImage" alt="">
                                    </div>
                                    <div class="item-info">
                                       <h3>{{pro.name}}</h3>
                                       <p>{{pro.subtitle}}</p>
                                       <p class="price" @click="addCart(pro.id)">{{pro.price}}元</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      <serviceb></serviceb>
      <!-- 弹框 -->
      <modal 
      title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType='middle' 
      :showModal='showModal'
      @cancel='showModal=false'
      @cart='goCart()'
      >
      <template v-slot:body>
         <p> 商品添加成功</p>
       </template>
      </modal>
    </div>
</template>

<script>
import serviceb from '../components/serviceBar';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import Modal from '../components/Modal';
export default {
    name:'index',
   components:{
        Swiper,
        SwiperSlide,
        serviceb,
        Modal
    },
    directives: {
    swiper: directive
  },
    data(){
        return{
            flag:false,
             swiperOptions: {
                 loop:true,
                 autoplay:true,
                 pagination: {
                        el: '.swiper-pagination',
                        clickable:true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },
          slideList:[
              {
                  id:'42',
                    img:'/imgs/slider/slide-1.jpg'
              },
              {
                  id:'45',
                    img:'/imgs/slider/slide-2.jpg'
              },
              {
                  id:'',
                    img:'/imgs/slider/slide-3.jpg'
              },
              {
                  id:'',
                    img:'/imgs/slider/slide-4.jpg'
              }
          ],
          menuProduct:[
              [
                  {id:30,
                    img:'/imgs/item-box-1.png',
                    name:'小米CC'
                  },
                  {
                      id:31,
                      img:'/imgs/item-box-2.png',
                       name:'小米8青春版'
                  },{
                      
                      id:32,
                      img:'/imgs/item-box-3.jpg',
                       name:'Redmi K20 Pro'
                  
                  },{
                      
                      id:33,
                      img:'/imgs/item-box-4.jpg',
                       name:'移动4G专区'
                  
                  }
              ],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
          ],
          advList:[
              {
                  id:33,
                  img:'/imgs/ads/ads-1.png'
              }, {
                  id:48,
                  img:'/imgs/ads/ads-2.jpg'
              },
               {
                  id:45,
                  img:'/imgs/ads/ads-3.png'
              },
               {
                  id:47,
                  img:'/imgs/ads/ads-4.jpg'
              }
          ],
          phoneList:[],
        //   弹框
        showModal:false
        }
    },
     mounted(){
        //  console.log(this.slideList);
       this.initpro();
    
     },
     methods:{
         mymove(){
             this.flag=true; 
         },
         initpro(){
             this.axios.get('/products',{
                 params:{
                     categoryId:100012,
                     pageSize:14
                 }
             }).then(res=>{
                res.list = res.list.splice(6,14);
                 this.phoneList =[res.list.slice(0,4),res.list.slice(4,8)];
                console.log(this.phoneList);
             })
         },
         goCart(){
             
             this.$router.push('/cart');
         },
        //  添加购物车
        addCart(id){
            this.axios.post('/carts',{
                 productId:id,
                selected:true
            }).then((res={})=>{
            this.showModal = true;
            // 获取数据
             this.$store.dispatch('saveCart',res.cartTotalQuantity);
            })
        }
         
         
     }
    
}
</script>
<style scoped>
 .contianer{
     position: relative;
     width: 1226px;
     margin: 0 auto;
     /* overflow: hidden; */
 }
.nav-menu{
    position:absolute;
    width: 264px;
    height: 451px;
    background-color: #55585a30;
    z-index:9;
    padding: 26px 0;
    box-sizing: border-box;
}

.menu-item{
    height:50px;
    line-height: 50px;
}
.menu-item a{
     position: relative;
    display: block;
    padding-left:30px;
    color:#fff;
    font-size: 16px;
}
.menu-item a::after{
    position: absolute;
    right: 30px;
    top: 17.5px;
    content: ' ';
    width: 15px;
    height: 15px;
    background: url('../../public/imgs/icon-arrow.png') no-repeat center center;
    background-size: contain;
}
.menu-item:hover{
    background-color: #ff6600;

}

.swiper-button-prev{
    left: 274px;
}
.warp-children{
    position: absolute;
display: none;
    top: 0;
   left:263px;
    width: 961px;
    height: 451px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    /* box-sizing: border-box; */
}
.menu-warp:hover .warp-children{
display: block;
}
.warp-children ul{
    display: flex;
     z-index: 99;
     justify-content: space-between;
     /* background-color: #fff; */
}
.warp-children ul li{
    flex: 1;
   height: 75px;
   line-height: 75px;
   padding-left: 23px;
}

.warp-children ul li a{
    color: #333;
    font-size: 14px;
}
.warp-children ul li img{
   /* display: block; */
   width: 42px;
   height: 35px;
   vertical-align: middle;
   margin-right: 5px;
}
 .index .swiper-container {
    height:451px;
   
}  
.index .swiper-container img{
    height: 100%;
    width: 100%;
} 
/* 广告 */
.adv-box{
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin: 14px 0 31px;
}
.adv-box a{
    width: 296px;
    height: 167px;
}
.adv-box a img{
    width: 100%;
    height: 100%;
}
a img{
    width: 100%;
    height: 100%;
}
.banner {
    margin-bottom: 50px;
}

/* 商品 */
.product-box{
    padding: 30px 0 50px;
    background-color: #f5f5f5;
    
}
.product-box h2{
    font-size: 22px;
    height: 21px;
    line-height: 21px;
    color: #333;
    margin-bottom: 20px;
}
.wraper{
    display: flex;
}
.banner-left{
    margin-right: 16px;
}
.banner-left img{
    width: 224px;
    height: 619px;
}
.list-box .list{
    display: flex;
    width: 986px;
    margin-bottom: 14px;
}
.list-box .list:last-child{
    margin: 0;
}
.list-box .item{
    width: 236px;
    height: 302px;
    background-color: #fff;
    text-align: center;
}
.list-box .item span{
    display: inline-block;
    width: 67px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
}
.list-box .item .new-pro{

    background-color: #7ecf68;
}
.list-box .item .kill-pro{
    background-color: #e82626 ;
}
.list-box .item img{
    display: inline-block;
    height: 181px;
    width: 100%;
}
.item-info h3{
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: #333;

}
.item-info p{
    color:#999 ;
    line-height: 13px;
    margin: 10px auto 13px;
}
.item-info .price{
    position: relative;
    color: #f20a0a;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}
.item-info .price:after{
    content: ' ';
    display: inline-block;
    
    width: 22px;
    height: 22px;
    margin-left: 5px;
   vertical-align: text-bottom;
    background: url('/imgs/icon-cart-hover.png') no-repeat center;
    background-size: contain;
}
</style>