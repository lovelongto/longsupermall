<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 5px 0 3px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 2;
  }
  .recommend-item img{
    width: 70px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
