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
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    components:{
      BScroll
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      // console.log(this.scroll);
      //2.监听滚动的位置`
      if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position)
        })
      }
      // this.scroll.refresh(); //重新计算wrapper高度
      //3.监听到scroll滚动到底部上拉事件,
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=3000){
        this.scroll&&this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll&&this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('执行刷新');
        this.scroll&&this.scroll.refresh()
      },
      getScrollY(){
        // console.log(this.scroll.y);
        return this.scroll?this.scroll.y:0
      }
    }
  }
</script>

<style scoped>

</style>
