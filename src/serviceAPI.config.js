const BASE_URL = "http://localhost:3000/" //本地
// const BASE_URL = "http://81.71.142.81:3000/"  //线上
const URL = {
  getShoppingMallInfo: BASE_URL + 'data',
  getGoodsInfo: BASE_URL + 'getGoodsInfo',
  registerUser: BASE_URL + 'user/register',
  getDetailGoodsInfo: BASE_URL + 'goods/getDetailGoodsInfo',
  getCategoryList: BASE_URL + 'goods/getCategoryList',
  getCategorySubList: BASE_URL + 'goods/getCategorySubList',
  getGoodsListByCategorySubId: BASE_URL + 'goods/getGoodsListByCategorySubId',
}

module.exports = URL