<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/*每个页面公共css=>全局样式 */
image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
input {
  display: block;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
</style>
