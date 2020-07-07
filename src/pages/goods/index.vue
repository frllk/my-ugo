<template>
  <view class="wrapper">
    <!-- 商品图片 -->
    <swiper autoplay class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="item in prd.pics" :key="item.pics_id">
        <image :src="item.pics_big" />
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <view class="meta">
      <view class="price">￥{{prd.goods_price}}</view>
      <view class="name">{{prd.goods_name}}</view>
      <view class="shipment">快递: 免运费</view>
      <text class="collect icon-star">收藏</text>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <!-- vue方式 -->
      <!-- <block v-html="prd.goods_introduce"></block> -->
      <!-- 小程序方式：不需要在打包 -->
      <rich-text :nodes="prd.goods_introduce"></rich-text>
    </view>
    <!-- <view class="detail">
    </view> -->
    <!-- 操作 -->
    <view class="action">
      <button open-type="contact" class="icon-handset">联系客服</button>
      <text class="cart icon-cart" @click="goCart">购物车</text>
      <!-- 显示购物车添加商品的数量 -->
      <text class="cartNum">{{carts.length}}</text>
      <text class="add" @click="hAddCart">加入购物车</text>
      <text class="buy" @click="createOrder">立即购买</text>
    </view>
  </view>
</template>

<script>
const STORAGE_CARTS = 'carts'
export default {
  data () {
    return {
      prd: null, // 商品详情数据
      carts: uni.getStorageSync(STORAGE_CARTS) || [] // 购物车本地数据
    }
  },
  onLoad (query) {
    console.log('详情', query)
    this.query = query
    this.getDetails(this.query)
  },
  methods: {
    goCart () {
      uni.switchTab({
        url: '/pages/cart/index'
      })
    },
    createOrder () {
      uni.navigateTo({
        url: '/pages/order/index'
      })
    },
    async getDetails (query) {
      let {
        msg: { status },
        data
      } = await this.request({
        url: '/api/public/v1/goods/detail',
        data: query
      })
      if (status === 200) {
        this.prd = data
      }
      console.log(status, data)
    },
    // 向购物车添加商品
    hAddCart () {
      /**
       * goods_id,  goods_name,  goods_price, goods_small_logo, 
       * goods_count(数量), goods_checked(是否被选中)
       * 1.排重？之前这个商品在购物车中是否存在，
       *  如果存在 => 加数量
       *  不存在 => 新增商品
       */
      // 如果当前详情页的商品id和本地存储中的商品id => 做对比
      let flag = this.carts.some((item) => {
        console.log(this.prd.goods_id === item.goods_id, this.prd.goods_id, item.goods_id)
        if (this.prd.goods_id === item.goods_id) {
          // 存在的数据 => 数量 + 1
          item.goods_count++
          return true
        }
      })

      // 不存在 => 新增商品
      if (!flag) {
        // 解构出：当前商品详情页的数据
        const { goods_id, goods_name, goods_price, goods_small_logo } = this.prd
        // 新增
        this.carts.push({
          goods_id,
          goods_name,
          goods_price,
          goods_small_logo,
          goods_count: 1, // 默认加进来数量是1
          goods_checked: true // 默认选中
        })
      }
      // 本地存储，本地持久化
      uni.setStorage({
        key: STORAGE_CARTS,
        data: this.carts
      });
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 100rpx;
  background-color: #f4f4f4;
}

.pics {
  height: 640rpx;
}

.meta {
  height: 250rpx;
  line-height: 1;
  padding: 30rpx 180rpx 30rpx 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .price {
    font-size: 36rpx;
    color: #ea4451;
    margin-bottom: 20rpx;
  }

  .name {
    color: #333;
    line-height: 1.4;
    font-size: 33rpx;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .shipment {
    font-size: 27rpx;
    color: #999;
    position: absolute;
    bottom: 30rpx;
  }

  .collect {
    width: 140rpx;
    height: 88rpx;
    text-align: center;
    box-sizing: border-box;
    border-left: 1rpx solid #ddd;
    font-size: 24rpx;
    color: #999;

    position: absolute;
    right: 10rpx;
    top: 91rpx;
  }

  [class*='icon-']::before {
    display: block;
    font-size: 45rpx;
    margin-bottom: 10rpx;
  }
}

.detail image {
  width: 100%;
  height: 480rpx;
  margin-top: 20rpx;
}

.action {
  width: 100%;
  height: 98rpx;
  background-color: #fff;

  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;

  text {
    display: block;
  }

  .add,
  .buy {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210rpx;
    text-align: center;
    font-size: 27rpx;
    color: #fff;
  }

  .add {
    background-color: #f4b73f;
  }

  .buy {
    background-color: #ea4451;
  }

  button {
    padding: 0;
    border-radius: 0;
    background-color: #fff;

    &::after {
      border: none;
    }
  }

  button,
  .cart {
    flex: 1;
    text-align: center;
    color: #989898;
    font-size: 24rpx;
    box-sizing: border-box;
  }

  [class*='icon']::before {
    display: block;
    font-size: 45rpx;
    margin-bottom: 2rpx;
  }
}
.cartNum {
  position: absolute;
  top: -10rpx;
  left: 260rpx;
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background-color: #ea4451;
  border-radius: 60rpx;
  color: #fff;
}
</style>
