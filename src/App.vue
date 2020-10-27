<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>



export default {
  name: 'App',
  components:{
   
  },
  data(){
    return{}
  },
  mounted(){
     if(this.$cookie.get('userId')){
      this.getUser(),
    this.getCartCount()
     }
    
  },
  methods:{
    // 页面加载就请求数据，用户数据
    // 因为注册登录会设置cookie，每次访问都会把cookie带去请求
    getUser(){
      this.axios.get('/user').then((res={})=>{
// 2.vuex用户登录状态,页面刷新，数据丢失，所以app渲染的时候，再请求一次
        this.$store.dispatch('saveUser',res.username);
      })
    },
    getCartCount(){
      // 设置默认值，
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCart',res)
      })
    }
  }
}

</script>

<style>
@import './assets/scss/reset.scss';
@import './assets//scss/button.css';
</style>
