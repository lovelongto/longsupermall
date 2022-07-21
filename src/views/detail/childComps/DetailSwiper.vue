<template>
    <swiper class="detail-swiper">
      <swiper-item  v-for="item in topImages">
        <img :src="item" alt="" @load="swiper">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      swiper(){
        console.log('图片加载完成');
        this.$bus.$emit('swiperimageload')
      }
    }
  }
</script>
<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
