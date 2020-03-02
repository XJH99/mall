<template>
  <div class="products_item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad"/>  <!--产品图片-->
    <div class="product_info">
      <p>{{productItem.title}}</p>
      <span class="price">￥{{productItem.price}}</span>
      <span class="collect">{{productItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductsListItem",
    props: {
      productItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.productItem.image || this.productItem.show.img
      }

    },
    methods: {
      //图片加载完成
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      //详情页查看点击事件
      itemClick() {
        //console.log('--------')
        this.$router.push('/detail/' + this.productItem.iid)
      }
    }
  }
</script>

<style scoped>
  .products_item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .products_item img {
    width: 100%;
    border-radius: 5px;
  }
  .product_info {
    /* 信息 */
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .product_info p {
    /* 标题 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .price {
    /* 价格 */
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .product_info .collect {
    position: relative;
  }
  .product_info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
