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
              <li v-for="(item,index) in category"
                  :key="index"
                  @click="clickLeftNav(index,item.ID)"
                  :class="curIndex == index ?'category-active':''">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="cateSubTabs">
            <van-tabs v-model="active">
              <van-tab v-for="(i,index) in categorySub"
                       :key="index"
                       :title="i.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh"
                              @refresh="dragDownRefresh">
              <van-list v-model="loading"
                        :finished="finished"
                        @load="dragUpLoad">
                <div class="list-item"
                     v-for="item in goodList"
                     :key="item">
                  {{item}}
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
import url from '@/serviceAPI.config.js';
import { Toast } from 'vant';

export default {
  data () {
    return {
      category: [],
      categorySub: [],
      page: 1,
      goodList: [],
      categorySubId: '',
      curIndex: 0,
      active: 0,
      loading: false,
      finished: false, //上拉加载是否有数据.
      isRefresh: false, //下拉加载
    }
  },
  methods: {
    async getCateGory () {
      try {
        const res = await this.axios({
          url: url.getCategoryList,
          methods: 'get'
        })
        if (res.data.code === 200 && res.data.res) {
          this.category = res.data.res
          this.active = 0
        } else {
          Toast('服务器错误,商品获取失败')
        }
        await this.getCateGorySubByCateId(this.category[0].ID)

      }

      catch (err) {
        console.log(err);
      }
    },
    async clickLeftNav (index, id) {
      await this.getCateGorySubByCateId(id);
      this.active = 0;
      this.curIndex = index;
    },
    async getCateGorySubByCateId (cateId) {
      try {
        const { data } = await this.axios({
          url: url.getCategorySubList,
          method: 'post',
          data: { categoryId: cateId }
        })
        if (data.code === 200 && data.res) {
          this.categorySub = data.res
        }
      }
      catch (err) {
        console.log(err);
      }
    },
    dragUpLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.goodList.push(this.goodList.length + 1)
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500)
    },
    dragDownRefresh () {
      setTimeout(() => {
        this.finished = false;
        this.isRefresh = false;
        this.list = [];
        this.dragUpLoad()
      }, 500);

    },
    getGoodList () {
      this.axios({
        url: url.getGoodsLisByCategorySuId,
        methods: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      }).then((res) => {
        if (res.data.code === 200 && res.data.res.length) {
          this.page++;
          this.goodList = [...this.goodList, ...res.data.res]
        } else {
          this.finished = true;
        }
        this.loading = false;
      }).catch(err => {
        console.log(err);
      })
    },
    clickCateSub (index) {
      this.categorySubId = this.categorySub[index].ID
      console.log('categorySubId:' + this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.dragUpLoad();
    }
  },
  created () {
    this.getCateGory()
  },
  mounted () {
    let height = document.documentElement.clientHeight
    document.getElementById('left-nav').style.height = height + 'px'
    document.getElementById('list-div').style.height = height - 90 + 'px'
  }
}
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
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
</style>