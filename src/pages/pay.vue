<template>
    
    <div>
      <orderlist title="订单支付">
            <template v-slot:order>
               <span> 谨防钓鱼链接、诈骗信息和电话</span>
            </template>
        </orderlist>
      <div class="wrapper">
          <div class="container">
              <div class="order-wrap">
                  <div class="item-order">
                      <div class="icon-succ"></div>
                      <div class="order-info">
                          <h2>订单提交成功！去付款咯～</h2>
                            <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
                            <p>收货信息：{{uerInfo}}</p>
                      </div>
                      <div class="order-total">
                         <p>应付总额：<span>{{payment}}</span>元</p>
                        <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail = !showDetail" ></em></p>
                      </div>
                  </div>
                 <div class="item-detail" v-if="showDetail">
                     <div class="item">
                        <div class="detail-title">订单号：</div>
                        <div class="detail-info theme-color">{{orderNo}}</div>
                     </div>
                      <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div class="detail-info">{{uerInfo}}</div>
                        </div>
                         <div class="item good">
                            <div class="detail-title">商品名称：</div>
                            <div class="detail-info">
                                
                                <ul>
                                  <li v-for="(item,index) in orderDetail" :key="index">
                                    <img v-lazy="item.productImage" alt="">{{item.productName}}
                                  </li>
                                </ul>
                            </div>
                 </div>
                 <div class="item">
                    <div class="detail-title">发票信息：</div>
                    <div class="detail-info">电子发票 个人</div>
                    </div>
              </div>

              <div class="item-pay">
                <h3>选择以下支付方式付款</h3>
                        <div class="pay-way">
                            <p>支付平台</p>
                            <div class="pay pay-ali" :class="{'checked':showType == 1}" @click="goPay(1)"></div>
                            <div class="pay pay-wechat" :class="{'checked':showType == 2}" @click="goPay(2)"></div>
              </div>
          </div>
         </div>
      </div>
    </div>
    <scqrcode 
    v-if="showPay"
    :img='payImg' 
    @closepay='close()'
    ></scqrcode>

    <modal
      title='订单支付'
      btnType='3'
      sureText='查看订单'
      cancelText='未完成'
      :showModal = 'showpaydetail'
      @cancel='showpaydetail=false'
      @cart = 'gocart()'
    >
    <template v-slot:body>
       <p>您确认是否完成支付？</p>
    </template>
    </modal>
     </div>
</template>

<script>
import QRCode from 'qrcode';
import scqrcode from '@/components/qrdoce';
import modal from '@/components/Modal';
import orderlist from '@/components/OrderHeader';
export default {
    name:'order-pay',
    data(){
        return{
          orderId:this.$route.query.orderNo,
          uerInfo:'',//卖家信息
          orderDetail:[],//订单详情
          payment:0,//订单总金额
          showDetail:false,
          showType:'',
          payImg:'',
          showPay:false,
          showpaydetail:false,//弹框
          timer:'',//定时器
        }
    },
    components:{
      scqrcode,
      modal,
      orderlist
    },
    mounted(){
      this.getorder()
    },
    methods:{
      
      // 获取订单信息
      getorder(){
       this.axios.get(`/orders/${this.orderId}`).then((res)=>{
         let item = res.shippingVo;
          this.uerInfo = `${item.receiverName}${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress} `;
          this.orderDetail = res.orderItemVoList;
          this.payment = res.payment;
       })
      },
      // 跳转支付宝
      goPay(n){
        if(n == 1){
          this.showType = 1;
          // 打开新窗口
          window.open('/#/order/alipay?orderId=' + this.orderId,'_blank')
        }else if(n == 2){
          this.showType = 2;
          // 微信支付 生成二维码
          this.axios.post('/pay',{
                 orderId:this.orderId,
                orderName:'何俊星的钱包',
                amount:0.01,
                payType:2
          }).then((res)=>{
              QRCode.toDataURL(res.content).then((url)=>{
                // 二维码地址
                  this.showPay=true
                this.payImg = url;
                this.orderState();
              }).catch((err)=>{
                alert(err)
              })
          })
        }
      },
      // 轮询支付状态
      orderState(){
       this.timer =  setInterval(()=>{
          this.axios.get(`/orders/${this.orderId}`).then((res)=>{
            if(res.status == 20){
              // 关闭定时器，路由跳转
              clearInterval(timer);
              this.$router.push('/order/list');
            }
          })
        },1000)
      },
      // 关闭微信支付页面
    close(){
        this.showPay=false;
        this.showpaydetail = true;
        // 防止一直打开二维码
        clearInterval(this.timer)
      },
    gocart(){
      this.$router.push('/order/list');
    }
    },
    


}
</script>

<style scoped>
.wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
}
.order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
}
 .item-order{
          display: flex;
          align-items: center;
 }
 .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
 .order-info{
            margin-right: 248px;
 }
  .order-info h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
  .order-info p{
              color:#666666;
  }
.order-info span{
                color:#FF6700;
              }
.order-total p:first-child{
              margin-bottom:30px;
            }
 .order-total  span{
              font-size:28px;
              color:#FF6700;
            }
.icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
}
.up{
                transform: rotate(180deg);
              }
.icon-up{
              transform: rotate(180deg);
            }
 .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          }
 .item{
            margin-bottom:19px;
 }
 .detail-title{
              float:left;
              width:100px;
            }
.detail-info{
              display:inline-block;
}
.detail-info img{
                width: 30px;
                vertical-align: middle;
              }
.item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
}
.item-pay h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
.pay-way{
          font-size:18px;
}
 .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
 }
.pay:last-child{
              margin-left:20px;
            }
.checked{
              border:1px solid #FF6700;
            }
.pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
.pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
</style>