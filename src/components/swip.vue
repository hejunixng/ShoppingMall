<template>
      <div class="index">
        <div class="contianer">
            <div class="nav-menu">
                <ul class="menu-warp">
                    <li class="menu-item"><a href="javascript:;">手机 电话卡</a>
                    </li>
                    <div class="warp-children">
                            <ul v-for="(item,index) in menuProduct" :key="index">
                                <li v-for="(sub,j) in item" :key="j">
                                    <a :href="sub?'/#/product/'+sub.id:''">
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
            </div>
            <!-- 轮播 -->
            <div class="adv-box"></div>
            <div class="banner"></div>
            <div class="product-box"></div>
        </div>
     
    </div>
</template>

<script>

export default {
    name:'index',
   components:{
       
       
    },
    
    data(){
        return{
           
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
          ]
        }
    },
     mounted(){
         console.log(this.slideList);
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
.menu-item:hover {
    background-color: blue;
    border:4px solid blue

}

.swiper-button-prev{
    left: 274px;
}
.warp-children{
    position: absolute;

    top: 0;
   left:263px;
    width: 961px;
    height: 451px;
    background-color: #fff;
    border: 4px solid blue;
    /* box-sizing: border-box; */
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
</style>
