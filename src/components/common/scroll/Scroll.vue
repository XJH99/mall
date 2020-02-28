<!--滚动组件-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position) //发出一个事件
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp') //发出上拉的事件
      })

      // this.scroll.scrollTo(0,0)
    },
    // methods: {
    //   scrollTo(x, y, time=300) {
    //     this.scroll.scrollTo(x, y, time)
    //   }
    // }
  }
</script>

<style scoped>

</style>
