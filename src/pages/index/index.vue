<template>
  <view class="index" :style="{overflow:'hidden', height: pageHeight}">
    <!-- 搜索 -->
    <search @setHeight="setHeight" />
    <!-- 轮播图 -->
    <view class="silder">
      <swiper indicator-dots autoplay circular indicator-color="rgba(0,0,0,.2)"
        indicator-active-color="rgba(255,255,255,1)" interval="2000">
        <swiper-item>
          <navigator url="">
            <image src="/static/uploads/banner1.png"></image>
          </navigator>
        </swiper-item>
        <swiper-item>
          <navigator url="">
            <image src="/static/uploads/banner2.png"></image>
          </navigator>
        </swiper-item>
        <swiper-item>
          <navigator url="">
            <image src="/static/uploads/banner3.png"></image>
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 栏目导航 -->
    <view class="navs">
      <navigator url="">
        <image src="/static/uploads/icon_index_nav_1@2x.png" />
      </navigator>
      <navigator url="">
        <image src="/static/uploads/icon_index_nav_2@2x.png" />
      </navigator>
      <navigator url="">
        <image src="/static/uploads/icon_index_nav_3@2x.png" />
      </navigator>
      <navigator url="">
        <image src="/static/uploads/icon_index_nav_4@2x.png" />
      </navigator>
    </view>
    <!-- 栏目floor1 -->
    <view class="floor" wx:for="{{3}}" wx:key="index">
      <!-- title -->
      <view class="ftitle">
        <image src="/static/uploads/pic_floor01_title.png" />
      </view>
      <!-- pics -->
      <view class="fitem">
        <navigator url>
          <image src="/static/uploads/pic_floor01_1@2x.png" />
        </navigator>
        <navigator url>
          <image src="/static/uploads/pic_floor01_2@2x.png" />
        </navigator>
        <navigator url>
          <image src="/static/uploads/pic_floor01_3@2x.png" />
        </navigator>
        <navigator url>
          <image src="/static/uploads/pic_floor01_4@2x.png" />
        </navigator>
        <navigator url>
          <image src="/static/uploads/pic_floor01_5@2x.png" />
        </navigator>
      </view>
    </view>
    <!-- 底部提示 -->
    <view class="end">
      <text>我是有底线的</text>
    </view>
  </view>
</template>

<script>
// 导入自定义组件
import search from "@/components/search.vue";
export default {
  data() {
    return {
      title: "Hello Ugo商城，我来了~~~",
      pageHeight: "auto"
    };
  },
  components: {
    search
  },
  onLoad() {},
  methods: {
    setHeight(e) {
      console.log(e);
      this.pageHeight = e;
    }
  }
};
</script>

<style lang="scss">
// 轮播图
.silder {
  .swiper,
  image {
    width: 100%;
    height: 340rpx;
  }
}
// 栏目导航
.navs {
  display: flex;
  margin: 24rpx 0 29rpx 0;
  justify-content: space-around;
  background: #fff;
  image {
    width: 128rpx;
    height: 140rpx;
  }
}
// 栏目楼层
.floor {
  .ftitle {
    padding-top: 30rpx;
    background: #f4f4f4;
    image {
      width: 750rpx;
      height: 60rpx;
    }
  }
  // pics
  .fitem {
    padding: 20rpx 16rpx 10rpx;
    overflow: hidden;
    navigator {
      float: left;
      width: 193rpx;
      height: 188rpx;
      margin-left: 10rpx;
      margin-bottom: 10rpx;
    }
    navigator:nth-child(1) {
      width: 232rpx;
      height: 386rpx;
      margin-left: 0;
    }
    navigator:nth-child(2),
    navigator:nth-child(5) {
      width: 273rpx;
      height: 188rpx;
    }
  }
  &:first-child {
    .fitem {
      navigator {
        width: 233rpx;
      }
    }
  }
}

// 底部提示
.end {
  padding: 30rpx;
  text-align: center;
  font-size: 24rpx;
  color: #999;
}
</style>
