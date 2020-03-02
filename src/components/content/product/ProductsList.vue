<template>
  <div class="products">
    <products-list-item
      v-for="(item,index) in products" :key="index"
      :productItem="item">
    </products-list-item>
  </div>
</template>

<script>
  import ProductsListItem from './ProductsListItem'
  export default {
    name: "ProductsList",
    props: {
      products: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      ProductsListItem
    }
  }
</script>

<style scoped>
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
