<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active"
                @change="changeBar(active)">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o">商品分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="gem-o">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      nowPath: ''
    }
  },
  mounted () {
    this.changeActive()
  },
  updated () {
    this.changeActive()
  },
  methods: {
    changeActive () {
      this.nowPath = this.$route.path
      if (this.nowPath === '/ShoppingMall') {
        this.active = 0
      }
      if (this.nowPath === '/categoryList') {
        this.active = 1
      }
      if (this.nowPath === '/cart') {
        this.active = 2
      }

    },
    changeBar (active) {
      console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: 'ShoppingMall' })
          break;
        case 1:
          this.$router.push({ name: 'CategoryList' })
          break
        case 2:
          this.$router.push({ name: 'Cart' })
          break
        case 3:
          // this.$router.push({ name: 'ShoppingMall' })
          break
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>