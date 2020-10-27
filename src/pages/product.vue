<template>
    <div>
       <productParams :title="product.name">
           <template v-slot:buy>
               <button class="btn" @click="buy()">立即购买</button>
           </template>
       </productParams>
      <div class="content">
          <div class="item-bg">
              <h2>{{product.name}}</h2>
             <h3>{{product.subtitle}}</h3>
             <p>
                 <a href="">全球首款双频</a><span class="midd">|</span>
                  <a href="">骁龙845</a><span class="midd">|</span>
                   <a href="">AI 变焦双摄</a><span class="midd">|</span>
                    <a href="">红外人脸识别</a>
             </p>
             <div class="price">￥<em>{{product.price}}</em></div>
          </div>
          <div class="item-bg-2"></div>
          <div class="item-bg-3"></div>
          <div class="item-swiper">
              <swiper ref="mySwiper" :options="swiperOptions">
                     <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    
            </swiper>
            <p class="desc">小米8 AI变焦双摄拍摄</p>
          </div>
          <div class="item-video">
              <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
              <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
            <div class="video-bg" @click="showVideo='slideDown'"></div>
            <div class="video-box" v-show="showVideo">
                <div class="overplay"  ></div>
               <div class="video" :class="showVideo">
                   <span class="btn-close" @click="slide()"></span>
                    <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
               </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import productParams from '../components/productParams';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
export default {
    name:'product',
    data(){
       return{
           showVideo:'',
           product:{},//商品
            swiperOptions: {
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
            }
       }
    },
    directives: {
    swiper: directive
    },
    components:{
        productParams,
        Swiper,
        SwiperSlide
    },
    mounted(){
        this.getProduct();
    },
    methods:{
        getProduct(){
            let id  = this.$route.params.id;
            this.axios.get(`/products/${id}`).then((res)=>{
              this.product = res
            })
        },
        buy(){
            let id  = this.$route.params.id;
            this.$router.push(`/detail/${id}`)
        },
        slide(){
            this.showVideo = 'slideUp';
            setTimeout(() => {
                // 
                // 等slideup效果做完后，清除类名
                 this.showVideo = '';
            }, 600);
        }
    }
}
</script>
<style scoped>
.item-bg{
    background:url('/imgs/product/product-bg-1.png') no-repeat center;
     height:718px;
     text-align: center;
}

 h2{
    font-size: 80px;
    padding-top: 50px;
}
 h3{
    font-size: 24px;
    letter-spacing: 10px;
}
p {
    margin: 21px 0 40px;
}
.item-bg p {
    font-size: 16px;
    color: #333;
}
.item-bg p a{
    color: #333;
}
.item-bg a span{
    margin: 0 15px;
}
.midd{
     margin: 0 15px;
}
.price{
    font-size: 30px;
    color: #333;
}
.price em{
    font-style: normal;
    color: #333;
}
.item-bg-2{
    background: url('/imgs/product/product-bg-2.png') no-repeat center center;
     height:480px;
     background-size: 1226px 397px;
}
.item-bg-3{
    background:url(/imgs/product/product-bg-3.png) no-repeat center;
    height: 638px;
    background-size: cover ;
}
.item-swiper{
    
    margin: 36px auto 52px;
    z-index: -1;
}

.desc{
    font-size:18px;
          color:#333333;
          text-align:center;
}
.item-swiper img{
    width: 100%;
    z-index: -1;
}
.video-bg{
     width:1226px;
    height:540px;
     background:url('/imgs/product/gallery-1.png') no-repeat center;
     background-size: cover;
     margin: 0 auto 120px;
     cursor: pointer;
}
.item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
    text-align: center;
}
.item-video p{
    font-size: 24px;
    margin-bottom:58px;
}
.item-video h2{
     font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
}
.video-box .overplay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: 10;
   background-color: #333;
}
@keyframes slideDown{
   from{
              top:-50%;
              opacity:0;
            }
            to{
              top:50%;
              opacity:1;
            }
}
@keyframes slideup{
    from{
        top: 50%;
        opacity: 1;
    }
    to{
        top: -50%;
        opacity: 0;
    }
}
.video{
    position: fixed;
    top: -50%;
    left: 50%;
    width: 1000px;
    height: 536px;
    transform: translate(-50%,-50%);
     z-index: 10;
     opacity: 1;
     transition: all 0.6s;
    
}
 .slideDown{
    animation: slideDown 0.6s linear ;
    /* 停留在50% */
     top:50%;
}
.slideUp{
    animation: slideUP 0.6s linear ;
}
 /* .slide{
    top: 50%;
    opacity: 1;
} */
/* 视频动画 */


.video video{
    width: 100%;
    height: 100%;
    /* 盖住浏览器默认黑框 */
    object-fit: cover;
     outline:none;
}
.btn-close{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background: url('/imgs/icon-close.png') no-repeat center center;
    z-index: 11;
    cursor: pointer;
}
</style>