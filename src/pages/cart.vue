<template>
    <div>
        <orderHeader title='我的购物车'>
            <template v-slot:order>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算 </span>
            </template>
        </orderHeader>
        <div class="wrapper">
            <div class="container">
                <div class="cart-box">
                    <ul class="cart-item-head">
                        <li class="col-1"><span class="checkbox" :class="{'checked':allchecked}" @click="toggleAll()"></span>全选</li>
                        <li class="col-3">商品名称</li>
                        <li class="col-1">单价</li>
                        <li class="col-2">数量</li>
                        <li class="col-1">小计</li>
                        <li class="col-1">操作</li>
                     </ul>
                     <ul class="cart-item-list">
                         <li class="cart-item" v-for="(item,index) in list" :key='index'>
                             <div class="item-check">
                                <span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
                                </div>
                            <div class="item-name">
                                <img v-lazy="item.productMainImage" alt="">
                                <span>{{item.productName + ',' + item.productSubtitle}}</span>
                            </div>
                              <div class="item-price">{{item.productPrice}}</div>
                               <div class="item-num">
                                    <div class="num-box">
                                        <a href="javascript:;" @click="updateCart(item,'-')" >-</a>
                                        <span>{{item.quantity}}</span>
                                        <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                                    </div>
                                </div>
                           <div class="item-total">{{item.productTotalPrice}}</div>
                            <div class="item-del" @click="delProduct(item)"></div>
                         </li>
                     </ul>
                </div>
                <div class="order-wrap clearfix">
                     <div class="cart-tip fl">
                        <a href="/#/index">继续购物</a>
                        共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
                </div>
                        <div class="total fr">
                        合计：<span>{{cartTotalPrice}}</span>元
                        <a href="javascript:;" class="btn" @click="orderPay()">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <servicebar></servicebar>
        <navfooter></navfooter>
    </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader';
import navfooter from '@/components/NavFooter';
import servicebar from '@/components/serviceBar';
import { Message } from 'element-ui';
export default {
    name:'cart',
    components:{
        OrderHeader,
        navfooter,
        servicebar,
        
    },
    data(){
        return{
           list:[],
           allchecked:false,
        cartTotalPrice:0,
        checkedNum:0
        }
    },
    mounted(){
        this.getCarList()
    },
    methods:{
        getCarList(){
            this.axios.get('/carts').then((res)=>{
                this.renshop(res);
            })
        },
        updateCart(item,type){
            let quantity = item.quantity;
            let selected = item.productSelected;
            if(type == '-'){
                if(quantity == 1){
                    Message.warning('商品至少保留一件');
                    return ;
                }
                quantity--
            }else if( type == '+'){
                if(quantity > item.productStock){
                    Message.warning('数量已超过库存');
                    return;
                }
                quantity++
            }else{
                // 选择框反选
                selected = !item.productSelected
            };
            this.axios.put(`/carts/${item.productId}`,{
                 quantity,
                selected
            }).then((res)=>{
               this.renshop(res)
            })
        },
        // 删除
        delProduct(item){
            this.axios.delete(`/carts/${item.productId}`).then((res)=>{
                 Message.success('删除成功！');
                this.renshop(res)
            })
        },
        // 全选
        toggleAll(){
            // 根据调用不同接口，决定是否全选
            let url = this.allchecked?'/carts/unSelectAll':'/carts/selectAll';
            this.axios.put(url).then((res)=>{
               
               this.renshop(res);
            })
        },
        // 查询商品状态 公共
        renshop(res){
            this.list = res.cartProductVoList || [];
                this.allchecked  =res.selectedAll;
                this.cartTotalPrice = res.cartTotalPrice;
                this.checkedNum = this.list.filter((item)=>item.productSelected).length;
        },
        // 下单
        orderPay(){
            // 如果权威fasle，返回才是true
            let pay = this.list.every(item=>!item.productSelected);
            if(pay){
                Message.warning('请选择一样商品')
            }else{
                this.$router.push('/order/confirm')
            }
        }
        
    }
}
</script>

<style scoped>
.wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
}
.cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
}
.checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
}
.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
.cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
}
.col-1{
 flex:1;
 }
 .col-2{
    flex:2;
    }
  .col-3{
   flex:3;
  }
.cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            }
.item-check{
              flex:1;
            }
 .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              }
 .item-name   img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
  .item-name  span{
                margin-left: 30px;
              }
.item-price{
              flex:1;
              color:#333333;
            }
.item-num{
              flex:2;
}
.num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
}
.num-box a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
.num-box span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
  .item-total{
              flex:1;
              color:#FF6600;
            }
.item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
 .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
 }
   .cart-tip{
          margin-left: 29px;
   }
    .cart-tip a{
            color: #666666;
            margin-right:37px;
          }
   .cart-tip  span{
            color:#FF6600;
            margin:0 5px;
          }
    .total{
          font-size:14px;
          color:#FF6600;
    }
  .total  span{
            font-size:24px;
          }
  .total a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
</style>