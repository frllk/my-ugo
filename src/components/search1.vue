<template>
  <!-- 搜索 -->
  <view class="search">
    <view class="sinput"><input type="text" placeholder="搜索"></view>
    <!-- 搜索结果 -->
    <view class="scontent"></view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  .sinput {
    box-sizing: border-box;
    padding: 20rpx 16rpx;
    background: #ff2d4a;
    position: relative;
    input {
      background-color: #fff;
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      color: #bbb;
      border-radius: 5rpx;
    }
  }
}
</style>