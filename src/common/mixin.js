import {debounce} from "./utils";

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
