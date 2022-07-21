<template>
    <swiper class="detail-swiper">
      <swiper-item  v-for="(item,index) in topImages">
        <img :src="item" alt="" @load="swiper(index,topImages)">
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
      swiper(index,topImages){
        if(index===topImages.length-1){
          console.log(topImages.length - 1);
          this.$bus.$emit('swiperimageload')
        }
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
