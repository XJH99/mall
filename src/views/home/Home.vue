<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControll"></tab-control>
      <products-list :products="products[currentType].list"></products-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from  'components/content/tabcontrol/TabControl'
  import ProductsList from 'components/content/product/ProductsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata,getHomeProducts} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      ProductsList,
      Scroll,
      BackTop,
      HomeSwiper,
      HomeRecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],  //轮播图数据
        recommends: [],  //导航数据
        products: {  //展示的数据
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品的数据
      this.getHomeProducts('pop')
      this.getHomeProducts('new')
      this.getHomeProducts('sell')
    },
    // 加载顺序的一个问题
    mounted() {
      //3.事件总线解决滚动区域bug,监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.scroll.refresh()
        // console.log('----------')
      })
    },
    methods: {
      /*事件监听的相关方法*/
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0,0,300)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeProducts(this.currentType) //再次的加载下面的数据
      },
      swiperImageLoad() {
       // console.log(this.$refs.tabControl.$el)
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends =res.data.recommend.list;
        })
      },
      getHomeProducts(type) {
        const page = this.products[type].page + 1;
        getHomeProducts(type,page).then(res => {
          this.products[type].list.push(...res.data.list);
          this.products[type].page += 1;

          this.$refs.scroll.scroll.finishPullUp() //刷新一下
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-bar {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
