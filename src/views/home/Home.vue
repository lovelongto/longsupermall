<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <scroll class="content" ref="scroll">
       <home-swiper :banners="banners"/>
       <RecommendView :recommends="recommends"></RecommendView>
       <feature-view/>
       <tab-control
         class="tab-control"
         :titles="['流行','新款','精选']"
         @tabClick="tabClick"/>
       <!--<good-list :goods="goods[currentType].list"/>-->
       <good-list :goods="showGoods"/>
     </scroll>
    <BackTop @click.native="backClick"/>
  </div>
</template>

<script>
  import  HomeSwiper from  './childComps/HomeSwiper'
  import  RecommendView from  './childComps/RecommendView'
  import  FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import  TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'
  import Scroll from 'components/common/scroll/Scroll'

  import {
    getHomeMultidata,
    getHomeGoods,
  } from "network/home";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data(){
     return{
       // result:null,
       banners:{},
       recommends:[],
       goods:{
         'pop':{page:0,list: []},
         'new':{page:0,list: []},
         'sell':{page:0,list:[]},
       },
       currentType:'pop'
     }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
     this.getHomeMultidata()

      //2.请求商品的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods:{
      //事件监听的相关方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,3000)
      },
      //网络请求的相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // this.result=res;
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        //http://152.136.185.210:7878/api/hy66/home/data?type=pop&page=1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color:white;
  position: fixed;
  top:0px;
  left: 0px;
  right: 0px;
  z-index: 9;
}
  .tab-control{
    /*还有很多浏览器不支持这个属性，移动端一般支持*/
    position: sticky;
    top:44px;
    z-index:9;
  }
  .content{
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  /*.content{*/
    /*height:calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 52px;*/
  /*}*/
</style>
