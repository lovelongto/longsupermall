import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutation-types'


export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      //1查找之前数组中是否有该商品
      let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)

      //2.判断oldproduc
      if (oldProduct){
        // oldProduct.count+=1
        context.commit(ADD_COUNTER,oldProduct)
        console.log('当前商品数量加1');
      } else{
        payload.count=1;
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        console.log('添加了新的商品');
      }
    })
  }
}
