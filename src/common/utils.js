export function debounce(func,delay){
  let timer=null
  return function (...args) {
    if(timer) clearTimeout(timer) //如果来得特别频繁，就取消掉
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
