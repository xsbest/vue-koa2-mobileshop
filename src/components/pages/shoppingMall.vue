<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon"
               class="location-icon"
               width="60%"
               alt="">
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
        <van-swipe-item v-for="(item,index) in bannerPicArray"
                        :key="index">
          <img v-lazy="item.imageUrl"
               width="100%"
               alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(item,index) in category"
           :key="index">
        <img :src="item.image"
             style="width:3rem"
             alt="">
        <div class="cate-name">{{item.mallCategoryName}}</div>
      </div>
    </div>
    <!-- banner area -->
    <div>
      <img v-lazy="advBanner"
           width="100% ">
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      locationIcon: require('../../assets/images/定位.png'),
      bannerPicArray: [
        { imageUrl: 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg' },
        { imageUrl: 'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png' },
        { imageUrl: 'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg' },
      ],
      category: [

      ],
      advBanner: ''
    }
  },
  created () {
    this.axios({
      url: "http://localhost:3000/data",
      method: 'get'
    }).then(res => {
      if (res.status === 200) {
        const data = res.data.data
        this.category = data.category
        this.advBanner = data.advertesPicture.PICTURE_ADDRESS
      }
      console.log(res);
    }).catch(e => {
      console.log(e);
    })
  }
}
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
  max-height: 9rem;
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
}
</style>