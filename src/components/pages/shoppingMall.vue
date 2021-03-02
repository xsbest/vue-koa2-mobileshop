<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon"
               class="location-icon"
               width="60%"
               alt="" />
        </van-col>
        <van-col span="16"
                 class="search-input"></van-col>
        <van-col span="5">
          <van-button size="mini"
                      class="search-button">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe autoplay="2000">
        <van-swipe-item v-for="(item, index) in bannerPicArray"
                        :key="index">
          <img v-lazy="item.imageUrl"
               width="100%"
               alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(item, index) in category"
           :key="index">
        <img :src="item.image"
             style="width:3rem"
             alt="" />
        <div class="cate-name">{{ item.mallCategoryName }}</div>
      </div>
    </div>
    <!-- banner area -->
    <div>
      <img v-lazy="advBanner"
           width="100% " />
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in recommendGoods"
                        :key="index">
            <div class="recommend-item"
                 @click="
                $router.push({
                  path: '/goods',
                  query: { goodsId: item.goodsId }
                })
              ">
              <img :src="item.image"
                   width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                ￥{{ item.price | moneyFilter }}(￥{{
                  item.mallPrice | moneyFilter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor area -->
    <floor-component :floorData="floor1"
                     :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2"
                     :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3"
                     :floorTitle="floorName.floor3"></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12"
                     v-for="(item, index) in hotGoods"
                     :key="index">
              <goods-info :goodsPrice="item.price"
                          :goodsImage="item.image"
                          :goodsName="item.name"
                          :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfoComponent";
import url from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/moneyFilter.js";
import "swiper/dist/css/swiper.css";
export default {
  data () {
    return {
      locationIcon: require("../../assets/images/定位.png"),
      bannerPicArray: [
        {
          imageUrl:
            "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg"
        },
        {
          imageUrl:
            "https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png"
        },
        {
          imageUrl:
            "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg"
        }
      ],
      category: [],
      advBanner: "",
      recommendGoods: [],
      swiperOptions: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money);
    }
  },

  //组件  ··········································
  components: { swiper, swiperSlide, floorComponent, goodsInfo },

  created () {
    this.axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(res => {
        if (res.status === 200) {
          const data = res.data.data;
          this.category = data.category;
          this.advBanner = data.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = data.recommend;
          this.floor1 = data.floor1;
          this.floor2 = data.floor2;
          this.floor3 = data.floor3;
          this.floorName = data.floorName;
          this.hotGoods = data.hotGoods;
        }
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #f3f33a;
  overflow: hidden;
  .location-icon {
    padding: 0.3rem;
  }

  .search-input {
    height: 1.8rem;
    border-bottom: 1px solid #fff;
  }

  .search-button {
    position: absolute;
    top: 0.6rem;
  }
}
.swiper-area {
  clear: both;
  max-height: 8.5rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: center;
  & > div {
    margin: 0.3rem;
  }
}
.recommend-area {
  background-color: #fff;
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #d3a900;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>
