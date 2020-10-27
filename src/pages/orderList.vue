<template>
    <div>
      <orderlist title="订单列表">
            <template v-slot:order>
               <span>谨防诈骗信息和电话</span>
            </template>
        </orderlist>
      <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <Loading v-if="loading"></Loading>
          <div class="order" v-for="(order,index) in list " :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.orderNo}}
                <span>|</span>
                订单号：{{order.paymentTypeDesc}}
                <span>|</span>
                在线支付
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice+'x'+item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status ==20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="gopay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
          class="pagination"
          background
          layout="prev,pager,next"
          :pageSize='pageSize'
          :total="total"
          @current-change="change"
          >

          </el-pagination>
          <nodata v-if="!loading && list.length ==0"></nodata>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import orderlist from '@/components/OrderHeader';
import Loading from '@/components/loading';
import nodata from '@/components/nodata';
// element 分页
import {Pagination} from 'element-ui';
export default {
    name:'order-list',
    data(){
      return{
        list:[],
        loading:true,
        pageSize:10,
        pageNum:1,
        total:0
      }
    },
    components:{
        orderlist,
        Loading,
        nodata,
        [Pagination.name]:Pagination
    },
    mounted(){
      this.getOrder()
      // console.log([] || 2);
      },
    methods:{
      // 订单列表
      getOrder(){
        this.axios.get('/orders',{
          params:{
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.loading = false;
          this.list =  res.list;
          this.total = res.total
        }).catch(()=>{
          this.loading = false;
        })
      },
      gopay(orderNo){
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      change(pageNum){
        console.log(pageNum);
        this.pageNum  = pageNum;
        this.getOrder()
      }
    }

}
</script>

<style scoped>
.el-pagination .is-background .el-pager li:not(.disabled) .active{
  background-color: #ff6600;
  color: #fff;
}
.pagination{
  text-align: right;
}
 .wrapper{
      background-color:#F5F5F5;
      padding-top:33px;
      padding-bottom:110px;
 }
 .order{
       border: 1px solid #d7d7d7;
          background-color:#ffffff;
          margin-bottom:31px;
 }
  .order:last-child{
            margin-bottom:0;
          }
.order-title{
           height: 74px;
           line-height: 74px;
            background-color:#FFFAF7;
            padding:0 43px;
            font-size:16px;
            color:#666666;
}
.item-info span{
                margin:0 9px;
              }
.money{
              font-size:26px;
              color:#333333;
            }
.order-content{
            padding:0 43px;
}
 .good-box{
              width:88%;
 }
 .good-list{
                display: flex;
                align-items: center;
                height:145px;}
 .good-img{
                  width:112px;
 }
.good-img img{
                    width:100%;
                  }
 .good-name{
                  font-size:20px;
                  color:#333333;
                }
.good-state{
             height:145px;
              font-size: 20px;
              color:#FF6600;
}
 .good-state a{
                color:#FF6600;
              }
.pagination{
          text-align:right;
        }
.el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
 .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
.load-more,
.scroll-more{
          text-align:center;
        }
</style>