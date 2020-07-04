<template>
  <!-- 搜索 -->
  <view class="search">
    <!-- 搜索区域 -->
    <view class="sinput">
      <input type="text" placeholder="搜索">
    </view>
    <!-- 搜索结果 -->
    <view class="content"></view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// 搜索
.search {
  display: flex;
  flex-direction: column;
  .sinput {
    padding: 20rpx 16rpx;
    background: #ff2d4a;
    position: relative;
    // 伪类元素
    &::after {
      position: absolute;
      top: 34rpx;
      left: 302rpx;
      content: "";
      width: 32rpx;
      height: 32rpx;
      margin-right: 16rpx;
      background-color: orange;
      background: url("/static/images/icon_search@2x.png");
      background-size: 32rpx;
    }
    input {
      background: #fff;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      color: #bbbbbb;
      border-radius: 5rpx;
    }
  }
}
</style>