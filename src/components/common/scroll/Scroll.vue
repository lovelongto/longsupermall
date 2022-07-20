<template>
  <!--ref/children-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    components:{
      BScroll
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll=new BScroll(this.$refs.wrapper,{

      })
      this.scroll.scrollTo(0,0)
    },
    methods:{
      scrollTo(x,y,time=3000){
        this.scroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>

</style>
