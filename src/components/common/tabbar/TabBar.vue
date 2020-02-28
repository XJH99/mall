<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>

  #tab-bar {
    display: flex;  /*水平分布*/
    background-color: #f6f6f6;

    position: fixed;  /*定位放到最下面*/
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,100,.3);  /*布置文字上面的阴影*/
  }


</style>