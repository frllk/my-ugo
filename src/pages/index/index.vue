<template>
  <view class="index" :style="{overflow:'hidden',height:pageHeight}">
    <!-- 搜索 -->
    <search @search="disScroll" />
    <!-- 轮播图 -->
    <view class="slider">
      <swiper autoplay interval="2000" circular indicator-dots indicator-color="rgba(255,255,255,1)"
        indicator-active-color="rgba(255,255,255,.6)">
        <swiper-item v-for="item in swiper" :key="item.goods_id">
          <navigator :url="'/pages/goods/index?id='+item.goods_id">
            <image :src="item.image_src" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 功能导航 -->
    <view class="navs">
      <navigator v-for="(item, index) in navs" :key="index"
        :url="item.navigator_url ? '/pages/category/index': '/pages/list/index?query='+item.name"
        :open-type="item.open_type || 'navigate'">
        <image :src="item.image_src" />
      </navigator>
    </view>
    <!-- 栏目楼层 -->
    <view class="floors">
      <!-- 1 -->
      <view v-for="item in floors" :key="item.name" class="floor">
        <!-- title -->
        <view class="ftitle">
          <image :src="item.floor_title.image_src" />
        </view>
        <!-- pics -->
        <view class="fitem">
          <navigator :url="'/pages/list/index?query=' +prd.name" v-for="(prd, index) in item.product_list" :key="index">
            <image :src="prd.image_src" />
          </navigator>
        </view>
      </view>
    </view>
    <!-- 底部提示 -->
    <view class="end">
      <text>我是有底线的！</text>
    </view>
    <!-- 回到顶部 -->
    <view @click="goTop" class="goTop icon-top"></view>
  </view>
</template>

<script>
// 导入组件
import search from "@/components/search";
export default {
  data() {
    return {
      pageHeight: "auto",
      // 轮播图
      swiper: [],
      // 导航
      navs: [],
      // 楼层
      floors: []
    };
  },
  // 注册组件
  components: {
    search
  },
  // vue=>created
  onLoad() {
    // uni.request({
    //   url: "https://api-ugo-dev.itheima.net/api/public/v1/home/swiperdata",
    //   success(res) {
    //     const { data } = res;
    //     console.log(data, res);
    //   }
    // });
    this.getSwiperData();
    this.getNavsData();
    this.getFloorsData();
  },
  onPullDownRefresh() {
    console.log("开始刷新...");
    Promise.all([
      this.getSwiperData(),
      this.getNavsData(),
      this.getFloorsData()
    ]).then(() => {
      // 执行完停止loading
      uni.stopPullDownRefresh();
    });
  },
  methods: {
    // 搜索时禁止页面滚动
    disScroll(e) {
      this.pageHeight = e;
    },
    goTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    // 获取轮播图数据
    async getSwiperData() {
      let {
        msg: { status },
        data
      } = await this.request({
        url: "/api/public/v1/home/swiperdata"
      });
      if (status === 200) {
        this.swiper = data;
      }
      console.log(data);
    },
    // 获取分类导航数据
    async getNavsData() {
      let {
        msg: { status },
        data
      } = await this.request({
        url: "/api/public/v1/home/catitems"
      });
      if (status === 200) {
        this.navs = data;
      }
      console.log(data);
    },
    // 获取楼层数据
    async getFloorsData() {
      let {
        msg: { status },
        data
      } = await this.request({
        url: "/api/public/v1/home/floordata"
      });
      if (status === 200) {
        this.floors = data;
      }
      console.log(data);
    }
  }
};
</script>

<style lang="scss">
.index {
  // 轮播
  .slider {
    swiper,
    image {
      width: 750rpx;
      height: 340rpx;
    }
  }
  // 功能导航
  .navs {
    display: flex;
    padding: 30rpx;
    background: #fff;
    justify-content: space-between;
    navigator {
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
  .end {
    text-align: center;
    font-size: 24rpx;
    color: #999;
  }
  .goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
