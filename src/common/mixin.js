import {debounce} from "./utils";
import BackTop from 'components/content/backtop/BackTop'

export  const itemListenerMixin={
  data(){
    return{
      itemImgListener: null,
      refresh:null
    }
  },
  mounted(){
    this.refresh=debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener=()=>{
      this.refresh();
    }
    //1.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('我是混入mixin中的内容');
  }
}

export const backTopmixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,3000)
    },
    listenShoBackTop(position){
      this.isShowBackTop=(-position.y)>1000
    },
  }
}
