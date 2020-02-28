import {request} from "./request";

//获取轮播图的数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//获取详细产品的数据
export function getHomeProducts(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
