<template>
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y>
      <view v-for="good in goods" :key="good.goods_id" class="item" @click="goDetail">
        <!-- 商品图片 -->
        <image class="pic" :src="good.goods_small_logo" />
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{good.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{good.goods_price}}
            <text>.00</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
      total: 0,
      pagenum: 1
    };
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: "/pages/goods/index"
      });
    }
  },
  onLoad(params) {
    console.log("query", params, params.query);
    this.getGoods(params.query);
  },
  methods: {
    // 获取商品列表
    async getGoods(query) {
      let {
        msg: { status },
        data
      } = await this.request({
        url: "/api/public/v1/goods/search",
        data: {
          query,
          pagenum: this.pagenum
        }
      });
      if (status === 200) {
        this.goods = data.goods;
        this.total = data.total;
      }
      console.log("searchResult", data);
    }
  }
};
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  height: 96rpx;
  line-height: 96rpx;
  border-bottom: 1rpx solid #ddd;

  /* #ifdef H5 */
  position: relative;
  z-index: 99;
  /* #endif */

  text {
    flex: 1;
    text-align: center;
    font-size: 30rpx;
    color: #333;

    &.active {
      color: #ea4451;
    }
  }
}

.goods {
  position: absolute;
  width: 100%;
  top: 97rpx;
  bottom: 0;
}

.item {
  display: flex;
  padding: 30rpx 20rpx 30rpx 0;
  margin-left: 20rpx;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .pic {
    width: 200rpx;
    height: 200rpx;
    margin-right: 30rpx;
  }

  .meta {
    flex: 1;
    font-size: 27rpx;
    color: #333;
    position: relative;
  }

  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    position: absolute;
    bottom: 0;

    color: #ea4451;
    font-size: 33rpx;

    text {
      font-size: 22rpx;
    }
  }
}
</style>
