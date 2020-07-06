<template>
  <view class="search" :class="{focused:isSearch}">
    <view class="sinput">
      <input v-model="keyword" @input="searchPrd" @confirm="goList" @focus="search" type="text" placeholder="搜索" />
      <button @click="cancel">取消</button>
    </view>
    <view class="scontent" v-show="isSearch">
      <div class="title">
        搜索历史
        <span @click="clearHistory" class="clear"></span>
      </div>
      <div class="history" v-if="list.length==0">
        <navigator v-for="(item, index) in history" :key="index" :url="'/pages/list/index?query='+item">{{item}}
        </navigator>
      </div>
      <!-- 搜索结果 -->
      <scroll-view scroll-y class="result" v-else>
        <navigator v-for="item in list" :key="item.good_id" url="/pages/list/index">{{item.goods_name}}</navigator>
      </scroll-view>
    </view>
  </view>
</template>

<script>
// 本地存储key
const STROAGE_KEY = 'history'
export default {
  data() {
    return {
      // 是否是搜索状态
      isSearch: false,
      history: uni.getStorageSync(STROAGE_KEY) || [], // 搜索历史
      keyword: '', // 搜索关键字
      list: [] // 搜索结果
    }
  },
  onLoad() {
    console.log(uni.getStorageSync(STROAGE_KEY))
  },
  methods: {
    search() {
      // 进入搜索状态
      this.isSearch = true
      // 获取设备的高度
      // console.log(uni.getSystemInfoSync())
      const pageHeight = uni.getSystemInfoSync().windowHeight + 'rpx'
      // 触发自定义事件，传递数据
      this.$emit('setHeight', pageHeight)
      // 隐藏tabBar
      uni.hideTabBar()
    },
    cancel() {
      // 恢复默认状态
      this.isSearch = false
      // 首页继续滚动
      this.$emit('setHeight', 'auto')
      // 显示tabBar
      uni.showTabBar()
      this.keyword = ''
      this.list = []
    },
    // 根据关键词搜索=》建议商品
    async searchPrd() {
      // 获取搜索关键词
      let {
        msg: { status },
        data
      } = await this.request({
        url: '/api/public/v1/goods/qsearch',
        data: {
          query: this.keyword
        }
      })
      if (status === 200) {
        this.list = data
      }
      console.log('获取搜索结果', data)
    },
    // 输入确定后=》跳转结果页面
    goList() {
      // console.log('go')
      // 存储搜索关键词
      this.history.unshift(this.keyword)
      this.history = [...new Set(this.history)]
      // 异步存不阻塞
      uni.setStorage({
        key: STROAGE_KEY,
        data: this.history
      })
      // 跳转到结果页
      uni.navigateTo({
        url: '/pages/list/index?query=' + this.keyword
      })
    },
    // 清除搜索历史
    clearHistory() {
      // 清楚页面=》内存中的数据
      this.history = []
      // 清除本地数据
      uni.removeStorage({
        key: STROAGE_KEY
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 搜索
.search {
  display: flex;
  flex-direction: column;
  .sinput {
    box-sizing: border-box;
    padding: 20rpx 16rpx;
    background: #ff2d4a;
    position: relative;
    //伪元素
    &::after {
      position: absolute;
      top: 28rpx;
      left: 302rpx;
      content: '';
      width: 44rpx;
      height: 44rpx;
      line-height: 1;
      background-image: url(https://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx;
      background-position: 6rpx center;
      background-repeat: no-repeat;
    }
    input {
      background: #fff;
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      color: #bbb;
      border-radius: 5rpx;
    }
    button {
      display: none;
      margin-left: 20rpx;
      width: 150rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      border-radius: 5rpx;
      background: transparent;
      color: #666;
    }
  }
  &.focused {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    .sinput {
      display: flex;
      background: #eee;
      input {
        text-align: left;
        padding-left: 60rpx;
      }
      button {
        display: block;
      }
      &::after {
        left: 30rpx;
      }
    }
  }
  .scontent {
    background: #fff;
    position: relative;

    flex: 1;
    padding: 27rpx;
    .title {
      font-size: 27rpx;
      line-height: 1;
      color: #333;
    }
    .clear {
      display: block;
      width: 27rpx;
      height: 27rpx;
      float: right;
      background-image: url(http://static.botue.com/ugo/images/clear.png);
      background-size: cover;
    }

    .history {
      padding-top: 30rpx;
      navigator {
        display: inline-block;
        line-height: 1;
        padding: 15rpx 20rpx 12rpx;
        background-color: #ddd;
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-bottom: 15rpx;
        color: #333;
      }
    }

    .result {
      // display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      navigator {
        line-height: 1;
        padding: 20rpx 30rpx;
        font-size: 24rpx;
        color: #666;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>