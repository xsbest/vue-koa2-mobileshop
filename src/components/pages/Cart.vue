<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"
                   left-arrow
                   left-text="返回"
                   @click-left="handleClickLeft" />
    </div>

    <div class="cart-list">
      <div class="row"
           v-for="(item, index) in cartInfo"
           :key="index">
        <div class="img">
          <img :src="item.image"
               width="100%" />
        </div>
        <div class="text">
          <div class="goods-name">{{ item.name }}</div>
          <div class="goods-controller">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="price">
          <div>￥{{ item.price | moneyFilter}}</div>
          <div>×{{item.count}}</div>
          <div class="totalPrice">
            ￥{{ item.price * item.count | moneyFilter}}
          </div>
        </div>
      </div>
      <!-- 总金额 -->
      <div class="bill">
        商品总价:￥{{totalMoney | moneyFilter}}
      </div>
    </div>
    <div class="cart-title">
      <van-button type="warning"
                  @click="clearCart"
                  style="width:100%">
        清空购物车
      </van-button>
    </div>
  </div>
</template>

<script>
import { toMoney } from '../../filter/moneyFilter';
export default {
  data () {
    return {
      cartInfo: [], //购物车内的商品
      isEmpty: true //购物车是否为空
    };
  },
  computed: {
    totalMoney () {
      let total = 0
      this.cartInfo.forEach((i) => {
        total += i.price * i.count
      })
      //本地存储
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return total
    }
  },
  filters: {
    moneyFilter (m) {
      return toMoney(m)
    }
  },
  created () {
    this.getCartInfo();
  },
  methods: {
    //得到购物车的商品
    getCartInfo () {
      //判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        //如果有数据，我们去除并赋值给cartInfo
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //打印到控制台查看效果
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? false : true;
    },
    clearCart () {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    handleClickLeft () {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #e4e7ed;
  }
  .img {
    flex: 6;
  }
  .text {
    flex: 14;
    padding-left: 10px;
  }
  .goods-controller {
    padding-top: 10px;
  }
  .price {
    flex: 4;
    text-align: right;
  }
}
.totalPrice {
  color: #ff976a;
}
.bill {
  text-align: right;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  font-size: 0.85rem;
}
</style>
