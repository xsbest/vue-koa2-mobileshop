<template>
  <div>
    <van-nav-bar title="商品详情"
                 left-text="返回"
                 left-arrow
                 @click-left="goBack">
    </van-nav-bar>

    <div class="topimage">
      <img :src="goodsInfo.IMAGE1"
           width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE}}</div>
    <div>
      <van-tabs>
        <van-tab title="商品详情">
          <div v-html="goodsInfo.DETAIL"
               class="detail">
          </div>
        </van-tab>
        <van-tab title="评论">
          评论
        </van-tab>

      </van-tabs>
    </div>
  </div>
</template>

<script>
import url from '@/serviceAPI.config.js';
import { Toast } from 'vant';

export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {

      }//商品信息
    }
  },
  methods: {
    getGoodsInfo () {
      this.axios.post(
        url.getDetailGoodsInfo,
        {
          goodsId: this.goodsId
        }
      )
        .then((res) => {
          if (res.data.code === 200 && res.data.msg) {
            this.goodsInfo = res.data.msg
          } else {
            Toast('服务器错误，数据获取失败')
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this.getGoodsInfo()
  }
}

</script>

<style lang="scss" scoped>
.topimage {
}
.goods-name,
.goods-price {
  background-color: #fff;
}
.detail {
  font-size: 0;
}
</style>