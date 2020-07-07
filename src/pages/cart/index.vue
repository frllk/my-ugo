<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <view class="dt">收货人:</view>
      <view class="dd meta">
        <text class="name">刘德华</text>
        <text class="phone">13535337057</text>
      </view>
      <view class="dt">收货地址:</view>
      <view class="dd">广东省广州市天河区一珠吉</view>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <!-- 遍历购物车的商品 -->
        <view v-for="(prd, i) in carts" :key="prd.goods_id" class="goods">
          <!-- 商品图片 -->
          <image class="pic" :src="prd.goods_small_logo" />
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{prd.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{prd.goods_price}}
              <text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text @click="changeCount(i,-1)" class="reduce">-</text>
              <input type="number" v-model="prd.goods_count" class="number" />
              <text @click="changeCount(i,1)" class="plus">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox" @click="selPrd(i)">
            <!-- 商品选择=>单选 -->
            <icon type="success" size="20" :color="prd.goods_checked?'#ea4451':'#ccc'"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall" @click="selAll">
        <icon type="success" :color="isSelAll?'#ea4451':'#ccc'" size="20"></icon>全选
      </label>
      <view class="total">
        合计:
        <text>￥</text>
        <label>{{amount}}</label>
        <text>.00</text>
      </view>
      <view class="pay">结算({{seledPrd.length}})</view>
    </view>
  </view>
</template>

<script>
const STORAGE_CARTS = 'carts'
export default {
  data () {
    return {
      // 购物车数据
      carts: []
    }
  },
  onLoad () {
    console.log(this.carts)
  },
  // 页面显示的时候执行的一个钩子
  onShow () {
    console.log('页面显示的时候执行的一个钩子')
    this.getCarts()
  },
  methods: {
    // 商品全选
    selAll () {
      /**
       * 1.如果是全部选中状态 => 取反 => 全部选不中
       * 2.不是全部选中状态 => 全部选中
       */
      if (this.isSelAll) {
        // 情况1 取反
        this.carts.forEach(item => item.goods_checked = false)
      } else {
        // 情况2 全部选中
        this.carts.forEach(item => item.goods_checked = true)
      }
      this.updateCarts()
    },
    // 商品单选
    selPrd (i) {
      // 取反
      this.carts[i].goods_checked = !this.carts[i].goods_checked
      this.updateCarts()
    },
    getCarts () {
      this.carts = uni.getStorageSync(STORAGE_CARTS) || []
    },
    /**
     * 购物车商品数量+/-
     * i：当前点击商品的索引
     * step：决定+1/-1
     */
    changeCount (i, step) {
      /**
       * 1.限制：+ => 不能大于库存  - => 最小是1
       * 2.满足数量范围（goods_count>=1 && goods_count<=库存）
       * 3.正常加减 => 加减完同步数据到本地
       */
      // 获取当前点击商品的 数量
      const curCount = this.carts[i].goods_count
      let kc = 10 // 库存（假数据）
      if (step === 1 && curCount >= kc) {
        return uni.showToast({
          title: '没货了！',
          duration: 1000
        });
      } else if (step === -1 && curCount === 1) {
        // -1操作
        return uni.showToast({
          title: '购物车数量最小是1！',
          duration: 1000
        });
      }
      // 正常加减操作
      this.carts[i].goods_count += step
      // 更新本地数据
      this.updateCarts()
    },
    /**
     * 更新本地购物车数据
     */
    updateCarts () {
      uni.setStorage({
        key: STORAGE_CARTS,
        data: this.carts
      });
    }
  },
  computed: {
    /**
     * 商品是否全部选中
     */
    isSelAll () {
      return this.carts.every(item => item.goods_checked === true)
    },
    /**
     * 当前选中的商品
     */
    seledPrd () {
      return this.carts.filter(item => item.goods_checked)
    },
    /**
     * 总金额
     */
    amount () {
      // let total = 0
      // this.seledPrd.forEach(item => total += item.goods_price * item.goods_count);
      // return total
      return this.seledPrd.reduce((acc, cur) => {
        // console.log(acc, cur.goods_price * cur.goods_count)
        return acc + cur.goods_price * cur.goods_count
      }, 0)
    }
  },
};
</script>

<style scoped lang="scss">
.shipment {
  height: 100rpx;
  line-height: 2;
  padding: 30rpx 30rpx 40rpx 30rpx;
  font-size: 27rpx;
  color: #333;
  background-color: #fff;
  background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  .dt {
    width: 140rpx;
    float: left;
    clear: both;
  }

  .dd {
    padding-left: 160rpx;
  }

  .meta {
    padding-right: 50rpx;
  }

  text.phone {
    float: right;
  }
}

.carts {
  background-color: #f4f4f4;
  padding-bottom: 110rpx;
  overflow: hidden;

  .shopname {
    padding: 30rpx;
    margin-top: 20rpx;
    font-size: 30rpx;
    color: #333;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
  }

  .goods {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 100rpx;
    border-bottom: 1rpx solid #eee;
    background-color: #fff;

    position: relative;

    .checkbox {
      width: 101rpx;
      height: 100%;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      left: -100rpx;
      top: 0;
    }

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

    .amount {
      position: absolute;
      bottom: 0;
      right: 20rpx;

      height: 48rpx;
      text-align: center;
      border: 1rpx solid #ddd;
      border-radius: 8rpx;

      display: flex;
      align-items: center;

      text {
        display: block;
        width: 60rpx;
        line-height: 48rpx;
        font-size: 36rpx;
        color: #ddd;
        text-align: center;
      }

      input {
        width: 60rpx;
        height: 48rpx;
        min-height: 48rpx;
        font-size: 27rpx;
        border-left: 1rpx solid #ddd;
        border-right: 1rpx solid #ddd;
      }
    }
  }
}

.extra {
  position: fixed;
  bottom: 0;
  /* #ifdef H5 */
  bottom: 50px;
  /* #endif */
  left: 0;
  z-index: 9;

  width: 750rpx;
  height: 96rpx;
  text-align: center;
  line-height: 96rpx;
  font-size: 36rpx;
  border-top: 1rpx solid #eee;
  background-color: #fff;
  color: #333;
  display: flex;

  .checkall {
    width: 140rpx;
    line-height: 1;
    margin-left: 25rpx;
    display: flex;
    align-items: center;

    icon {
      margin-right: 20rpx;
    }
  }

  .total {
    display: flex;
    justify-content: center;
    flex: 1;

    label,
    text {
      color: #ea4451;
      vertical-align: bottom;
      position: relative;
      bottom: -2rpx;
    }

    text {
      position: relative;
      bottom: -3rpx;
      font-size: 24rpx;

      &:first-child {
        margin-left: 10rpx;
      }
    }
  }

  .pay {
    width: 200rpx;
    background-color: #ea4451;
    color: #fff;
  }
}
</style>

