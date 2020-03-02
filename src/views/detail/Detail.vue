<script src="../../network/detail.js"></script>
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <products-list :products="recommends"></products-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import ProductsList from 'components/content/product/ProductsList'

  import {getDetail} from "network/detail";
  import {Goods} from "network/detail";
  import {Shop} from "network/detail";
  import {GoodsParam} from "network/detail";
  import {getRecommend} from "network/detail";

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      ProductsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
      }
    },
    created() {
      //1.保存传入的iid值
      this.iid = this.$route.params.iid;
      //2.根据iid来请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //2.1获取顶部轮播图数据
        this.topImages = res.result.itemInfo.topImages

        //2.2获取价格等数据
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)

        //2.3获取商家的数据
        this.shop = new Shop(res.result.shopInfo)

        //2.4获取图片的展示信息
        this.detailInfo = res.result.detailInfo

        //2.5获取参数的信息
        this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
        
        //2.6获取评论信息
        if (res.result.rate != null){
          this.commentInfo = res.result.rate.list[0]
        }
      });
      getRecommend().then( res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh()
      }
    }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    height: calc(100% - 44px);
  }

</style>
