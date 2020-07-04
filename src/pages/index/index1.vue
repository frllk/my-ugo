<template>
  <view class="index">
    <!-- 搜索 -->
    <!-- <view class="search"></view> -->
    <search />
    <!-- 轮播图 -->
    <view class="slider"></view>
    <!-- 功能导航 -->
    <view class="navs"></view>
    <!-- 栏目楼层 -->
    <view class="floors"></view>
    <!-- 底部提示 -->
    <view class="end">
      <text>我是有底线的！</text>
    </view>
  </view>
</template>

<script>
import search from "@/components/search1.vue";
export default {
  components: {
    search
  }
};
</script>

<style lang="scss" scoped>
</style>