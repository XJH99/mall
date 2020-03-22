
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <products-list :products="recommends" ref="recommend"></products-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
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
  import DetailBottomBar from './childComps/DetailBottomBar'

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
      DetailBottomBar,
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
        recommends: [],
        themeTopYs: [],
        currentIndex: 0
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
    mounted() {


    },
    methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh();

          this.themeTopYs = [];
          this.themeTopYs.push(0);
          // console.log(this.$refs.params);
          // console.log(this.$refs.comment);
          // console.log(this.$refs.recommend);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs);
      },
      //点击标题滚到相应的区域
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y;
        //console.log(positionY);

        //2.进行相应的判断
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++){
          if (this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            ||
            (i === length-1 && positionY >= this.themeTopYs[i])){
            this.currentIndex = i;
            //console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },
      addToCart() {
        //1.获取购物车信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        this.$store.commit('addCart',product);
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
    height: calc(100% - 44px - 49px);
  }

</style>
