<template>
  <div class="products_item">
    <img :src="productItem.show.img" alt=""/>  <!--产品图片-->
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
    }
  }
</script>

<style scoped>
  .products_item {
    padding: 0.21rem;
    width: 48%;
    position: relative;
    padding-bottom: 1.68rem;
  }
  .products_item img {
    width: 100%;
    border-radius: 0.21rem;
  }
  .product_info {
    /* 信息 */
    font-size: 0.64rem;
    text-align: center;
    position: absolute;
    bottom: 0.21rem;
    left: 0;
    right: 0;
  }
  .product_info p {
    /* 标题 */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .price {
    /* 价格 */
    color: var(--color-high-text);
    margin-right: 0.85rem;
  }
  .collect::before {
    display: inline-block;
    content: "";
    background: url("~assets/img/common/collect.svg") 0 0/0.6rem 0.6rem;
    position: relative;
    top: 0.04rem;
    right: 0.08rem;
    height: 0.6rem;
    width: 0.6rem;
  }
</style>
