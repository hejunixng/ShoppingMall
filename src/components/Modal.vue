<template>
   <transition name="slide">
        <div class="modal" v-show="showModal">
        <div class="mask"></div>
        <div class="modal-dailog">
            <div class="modal-header">
                <span>{{title}}</span>
                <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
            </div>
             <div class="modal-body">
                 <slot name='body'></slot>
             </div>
              <div class="modal-footer">
                   <a href="javascript:;" class="btn" @click='$emit("cart")' v-if="btnType ==1">{{sureText}}</a>
                  <a href="javascript:;"  class="btn" @click='$emit("cancel")' v-if="btnType ==2">{{cancelText}}</a>`
                  <!-- btntype -->
                  <div class="btn-group" v-if="btnType ==3">
                   <a href="javascript:;" class="btn" @click='$emit("cart")'>{{sureText}}</a>
                  <a href="javascript:;"  class="btn btn-default" @click='$emit("cancel")'>{{cancelText}}</a>`
                  </div>
              </div>
        </div>
    </div>
   </transition>
</template>

<script>
export default {
    name:'modal',
    props:{
        modalType:{
            // 弹窗类型
            type:String,
            default:'form'
        },

        // 弹框标题
        title:String,

        btnType:String,
        // 按钮类型
        sureText:{
            type:String,
            default:'确定'
        },
        cancelText:{
            type:String,
            default:'取消'
        },
        // 
        showModal:Boolean


    }
}
</script>
<style scoped>
@import '../assets/scss/moda.css';
</style>