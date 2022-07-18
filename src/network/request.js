import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000,
    headers:{}
  })
  //2.axios拦截器
  //2.1请求拦截的作用
  // axios.interceptors.request;
  instance.interceptors.request.use(config=>{
    return config  //如果不返回回去，那边拿不到
  },err=>{
    console.log(err);
  });

  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data  //处理完后要返回，不然那边拿不到
  },err=>{
    console.log(err);
  });
  //发送真正的网络请求
  return instance(config)

}
