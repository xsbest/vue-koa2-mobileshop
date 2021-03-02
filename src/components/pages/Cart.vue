<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>

    <div class="cart-list">
      <div class="row" v-for="(item, index) in cartInfo" :key="index">
        <div class="img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="text">
          <div class="goods-name">{{ item.name }}</div>
          <div class="goods-controller">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="price">￥{{ item.price }}</div>
      </div>
    </div>
    <div class="cart-title">
      <van-button type="warning" @click="clearCart" style="width:100%">
        清空购物车
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: [], //购物车内的商品
      isEmpty: true //购物车是否为空
    };
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    //得到购物车的商品
    getCartInfo() {
      //判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        //如果有数据，我们去除并赋值给cartInfo
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //打印到控制台查看效果
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? false : true;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  text-align: right;
}
</style>
