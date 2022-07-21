<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
    <!--{{goods}}-->
  </div>
</template>

<script>
  import GoodsListItem from 'components/content/goods/GoodsListItem'
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
 .goods{
   /*容器弹性布局*/
   display: flex;
   /*弹性布局必要时是否换行*/
   flex-wrap: wrap;
   /*justify-content: space-around; 周围的空间一样，evenly均匀的*/
   justify-content: space-evenly;
 }

</style>
