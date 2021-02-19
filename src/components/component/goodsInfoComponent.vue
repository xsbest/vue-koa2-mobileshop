<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{ goodsName }}</div>
    <div class="goods-price">￥{{ goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "../../filter/moneyFilter";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice"],
  data() {
    return {};
  },
  filters: {
    moneyFilter: function(money) {
      return toMoney(money);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
