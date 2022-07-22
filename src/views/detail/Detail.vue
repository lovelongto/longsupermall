<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params :param-info="paramInfo"></detail-params>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommend"/>
    </scroll>
    <!--<div v-for="n in 10">{{n}}</div> n遍历是从1开始的-->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import  DetailSwiper from './childComps/DetailSwiper'
  import  DetailBaseInfo from './childComps/DetailBaseInfo'
  import  DetailShopInfo from './childComps/DetailShopInfo'
  import  DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import  DetailParams from './childComps/DetailParams'
  import  DetailCommentInfo from  './childComps/DetailCommentInfo'

  import  Scroll from  'components/common/scroll/Scroll'
  import  GoodsList from  'components/content/goods/GoodsList'

  import  {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import {debounce} from "common/utils";
  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParams,
      DetailCommentInfo,
      GoodsList
    },
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommend:[],
        itemImgListener:null
      }
    },
    created() {
      //保存传入的iid
      this.iid=this.$route.params.iid //获取路径的参数

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //获取轮播图数据
        console.log(res);
        const data=res.result;
        this.topImages=res.result.itemInfo.topImages;

        //2.获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop=new Shop(data.shopInfo)

        //4.获取详情数据
        this.detailInfo=data.detailInfo

        //5.获取参数的信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //请求推荐栏的信息
      getRecommend().then(res=>{
        this.recommend=res.data.list
      })
    },
    mounted(){
      const refresh=debounce(this.$refs.scroll.refresh,50)
      this.itemImgListener=()=>{
        refresh();
      }
      //1.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
    destroyed() {
      this.$bus.$off('itemImaLoad',this.itemImgListener)
    }

  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  
  .content{
    height: calc(100% - 44px);
    background-color: #fff;
    z-index: 9;
  }
  .detail-nav-bar{
    position:relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
