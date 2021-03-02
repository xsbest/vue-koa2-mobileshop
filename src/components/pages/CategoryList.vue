<template>
  <div>
    <div class="nav-bar">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="left-nav">
            <ul>
              <li
                v-for="(item, index) in category"
                :key="index"
                @click="clickLeftNav(index, item.ID)"
                :class="curIndex == index ? 'category-active' : ''"
              >
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="cateSubTabs">
            <van-tabs v-model="active" @click="clickCateSub">
              <van-tab
                v-for="(i, index) in categorySub"
                :key="index"
                :title="i.MALL_SUB_NAME"
              >
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="dragDownRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="dragUpLoad"
              >
                <div
                  class="list-item"
                  v-for="(item, index) in goodList"
                  :key="index"
                  @click="goGoodsInfo(item.ID)"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errImage" />
                  </div>
                  <div class="list-item-text">
                    <div>{{ item.NAME }}</div>
                    <div class="">￥{{ item.ORI_PRICE | moneyFilter }}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "../../filter/moneyFilter";
export default {
  data() {
    return {
      category: [],
      categorySub: [],
      page: 1,
      goodList: [],
      categorySubId: "",
      categoryIndex: 0,
      curIndex: 0,
      active: 0,
      loading: false,
      finished: false, //上拉加载是否有数据.
      isRefresh: false, //下拉加载
      errImage: 'this.src="' + require("@/assets/images/errorimg.png") + '"'
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    async getCateGory() {
      try {
        const res = await this.axios({
          url: url.getCategoryList,
          methods: "get"
        });
        if (res.data.code === 200 && res.data.res) {
          this.category = res.data.res;
          this.active = 0;
          await this.getCateGorySubByCateId(this.category[0].ID);
        } else {
          Toast("服务器错误,商品获取失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async clickLeftNav(index, id) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.curIndex = index;
      await this.getCateGorySubByCateId(id);
    },
    //根据大类ID获取小类
    async getCateGorySubByCateId(cateId) {
      try {
        const { data } = await this.axios({
          url: url.getCategorySubList,
          method: "post",
          data: { categoryId: cateId }
        });
        if (data.code === 200 && data.res) {
          this.categorySub = data.res;
          this.active = 0;
          this.categorySubId = this.categorySub[0].ID;
          this.dragUpLoad();
        }
      } catch (err) {
        console.log(err);
      }
    },
    //上拉加载
    dragUpLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
        console.log(this.goodList);
      }, 500);
    },
    //下拉刷新
    dragDownRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.dragUpLoad();
      }, 500);
    },
    getGoodList() {
      this.axios({
        url: url.getGoodsListByCategorySubId,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data.res.length) {
            this.page++; //下拉就请求下一页的
            this.goodList = [...this.goodList, ...res.data.res];
            // console.log(this.goodList);
          } else {
            this.finished = true;
            // console.log(this.goodList);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击小类
    clickCateSub(index) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = []; //清空
      this.finished = false; //未完成状态
      this.page = 1;
      this.dragUpLoad(); //加载
    },
    //跳转到商品详细页
    goGoodsInfo(id) {
      this.$router.push({ path: "/goods", query: { goodsId: id } });
    }
  },
  created() {
    this.getCateGory();
  },
  mounted() {
    let height = document.documentElement.clientHeight;
    document.getElementById("left-nav").style.height = height + "px";
    document.getElementById("list-div").style.height = height - 90 + "px";
  }
};
</script>

<style lang="scss" scoped>
#left-nav {
  background-color: rgb(205, 232, 255);
  & > ul > li {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
  }
}
.category-active {
  background-color: #fff;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
