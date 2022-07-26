<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!--<ul>-->
        <!--<li v-for="item in $store.state.cartList">{{item}}</li>-->
      <!--</ul>-->
      <!--属性：topImages 传入值：top-images-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params ref="params" :param-info="paramInfo"></detail-params>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>

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
  import  DetailBottomBar from  './childComps/DetailBottomBar'


  import  Scroll from  'components/common/scroll/Scroll'
  import  GoodsList from  'components/content/goods/GoodsList'

  import  {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopmixin} from "common/mixin";

  import { mapActions} from 'vuex'
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
      GoodsList,
      DetailBottomBar,
    },
    mixins:[itemListenerMixin,backTopmixin],
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
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    created() {
      //保存传入的iid
      this.iid=this.$route.params.iid //获取路径的参数

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //获取轮播图数据
        // console.log(res);
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
      /*
           DOM没有渲染
           this.themeTopYs.push(0)
           this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
           this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
           this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
           console.log(this.themeTopYs);*/
      this.$nextTick(() => {
        /* DOM已经渲染完成， 图片没有加载完成
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);*/
      })


      //请求推荐栏的信息
      getRecommend().then(res=>{
        this.recommend=res.data.list
      })

      //4.给getThemeTopY赋值 给函数赋值进行防抖
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE);//给一个最大值
        // console.log(this.themeTopYs);
      },100)

    },
    mounted(){
      // console.log('在mixin中');
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        // this.$refs.scroll.refresh()
        this.refresh()
        this.getThemeTopY();
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        //1.判断backtop是否显示

        this.listenShoBackTop(position)
        //1.获取y值
        const positionY=-position.y;
        //2.positionY和题中的值进行对比
        let lenght=this.themeTopYs.length;
        for(let i= 0;i<lenght-1;i++){
          // if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
          //   console.log(i);
          // }

          if (this.currentIndex!==i&&(positionY>=this.themeTopYs[i]
            &&positionY<this.themeTopYs[i+1])) {
              this.currentIndex=i;
              this.$refs.nav.currentIndex=this.currentIndex;
          }
          // if(this.currentIndex!==i&&((i<lenght-1&&positionY>=this.themeTopYs[i]
          //   &&positionY<this.themeTopYs[i+1])||(i===lenght-1&&positionY>=this
          //   .themeTopYs[i]))){
          //   this.currentIndex=i;
          //   this.$refs.nav.currentIndex=this.currentIndex;
          // }
        }
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        product.checked=false

        //2.将商品添加到购物车上面(1.promise, 2.mapActions
        // this.$store.cartList.push(product)  //不要这样，要通过mutation
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res=>{
          console.log(res);
        })
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
        //有判断的通过actions
      },
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
    height: calc(100% - 44px - 49px);
    background-color: #fff;
    z-index: 9;
  }
  .detail-nav-bar{
    position:relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
