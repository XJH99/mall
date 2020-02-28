//将axios独立抽取出来，进行相应的配置，易于维护
import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
      //baseURL: 'http://123.207.32.32:8000/',
      baseURL : 'http://106.54.54.237:8000/',
      timeout: 5000
    })

    //2.axios的拦截器
    //2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
      //比如在某些网络请求（token认证中），必须携带写特殊的信息
      //console.log(config);
      return config
    },err => {
      //console.log(err);
    })

    //2.2 响应拦截
     instance.interceptors.response.use(res => {
       //console.log(res);
       return res.data
     },err => {
       //console.log(err);
     })

    //3.发送真正的网络请求
     return instance(config)
}

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //1.创建axios实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     //2.发送真正的网络请求
//     instance(config).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
//
// }
