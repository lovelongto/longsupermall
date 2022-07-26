<template>
  <div class="wrapper" ref="aaaa">
      <ul class="content">
        <button @click="btn">点击一下</button>
        <li>分类的列表1</li>
        <li>分类的列表2</li>
        <li>分类的列表3</li>
        <li>分类的列表4</li>
        <li>分类的列表5</li>
        <li>分类的列表6</li>
        <li>分类的列表7</li>
        <li>分类的列表8</li>
        <li>分类的列表9</li>
        <li>分类的列表10</li>
        <li>分类的列表11</li>
        <li>分类的列表12</li>
        <li>分类的列表13</li>
        <li>分类的列表14</li>
        <li>分类的列表15</li>
        <li>分类的列表16</li>
        <li>分类的列表17</li>
        <li>分类的列表18</li>
        <li>分类的列表19</li>
        <li>分类的列表20</li>
        <li>分类的列表21</li>
        <li>分类的列表22</li>
        <li>分类的列表23</li>
        <li>分类的列表24</li>
      </ul>
    <!--<BackTop @click.native="backClick" v-show="isShowBackTop"/>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // import {backTopmixin} from "common/mixin";

  export default {
    name: "Category",
    // mixins:[backTopmixin],
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll=new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position)=>{
        console.log(position);
      })
      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多');
      })
    },
    methods:{
      btn(){
        console.log('点击');
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    height:150px;
    background-color: red;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
