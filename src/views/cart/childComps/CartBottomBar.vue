<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return  preValue+item.price*item.count
        },0)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
        // return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length===0) return false
        // return !(this.cartList.filter(item=>item.checked).length)
      // return  !this.cartList.find(item=>!item.checked)
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){//全部选中
          this.cartList.forEach(item=>item.checked=false)
        }else { //有部分不选中或全部不选中
          this.cartList.forEach(item=>item.checked=true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    background-color: #eee;
    position: relative;
    display: flex;
    height:40px;
    line-height: 40px;
  }
  .check-content{
    display: flex;
    align-items: center;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height:20px;
    margin-left: 5px;
  }
  .total{
    margin-left: 30px;
  }
  .calculate{
    font-size: 14px;
    text-align: center;
    color: #fff;
    width: 100px;
    background-color: red;
    position: fixed;
    right: 0;
    /*right: ;*/
  }
</style>
