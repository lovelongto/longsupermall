<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot  name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeSytle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1  //没找到当前路径返回-1false
      },
      activeSytle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    data(){
      return {
        // isActive:true,
      }
    },
    methods:{
      itemClick(){
       this.$router.replace(this.path)
      }
    }
  }
</script>
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;

  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top:3px;
    vertical-align: middle;
  }
</style>
