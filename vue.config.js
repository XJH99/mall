module.exports = {
  configureWebpack: {
    resolve: {
      //解决路径别名的问题
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
