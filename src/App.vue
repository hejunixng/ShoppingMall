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
    this.getUser()
  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res)=>{

      })
    }
  }
}

</script>

<style>
@import './assets/scss/reset.scss';
@import './assets//scss/button.css';
</style>
