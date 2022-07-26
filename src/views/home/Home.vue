<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
     <scroll class="content" ref="scroll"
             :probe-type="3"
             @scroll="contentScroll"
             :pull-up-load="true"
             @pullingUp="loadMore">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
       <RecommendView :recommends="recommends"></RecommendView>
       <feature-view/>
       <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick" ref="tabControl2" />
       <!--<good-list :goods="goods[currentType].list"/>-->
       <good-list :goods="showGoods"/>
     </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import  HomeSwiper from  './childComps/HomeSwiper'
  import  RecommendView from  './childComps/RecommendView'
  import  FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import  TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getHomeMultidata, getHomeGoods,} from "network/home";
  import  {debounce} from "common/utils";
  import  {itemListenerMixin,backTopmixin} from "common/mixin";

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
    },
    mixins:[itemListenerMixin,backTopmixin],
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
       currentType:'pop',
       tabOffsetTop:0,
       isTabFixed:false,
       saveY:0,
     }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed(){
      console.log('home destroyed');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //保存Y值
      this.saveY=this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImaLoad',this.itemImgListener)
    },
    created() {
      //1.请求多个数据
     this.getHomeMultidata()

      //2.请求商品的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){     // console.log('在mixin中');
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
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      contentScroll(position){
        //1.判断backtop是否显示
        this.listenShoBackTop(position)

        //2.决定tabControl是否吸顶（position：fixed
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType) //加载更多
        // this.$refs.scroll.refresh() //重新计算可滚动区域
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

          this.$refs.scroll.finishPullUp() //完成一次上拉加载更多
        })
      },

      //2.轮播图加载完后获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color:white;
  /*这是防止原生滚动的跟滚动，但是现在用betterscroll,所以不用这个*/
  /*position: fixed;*/
  /*top:0px;*/
  /*left: 0px;*/
  /*right: 0px;*/
  /*z-index: 9;*/
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
  .tab-control{
    position: relative;
    z-index: 9;
  }

  /*.content{*/
    /*height:calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*!*margin-top: 44px;*!*/
  /*}*/
</style>
