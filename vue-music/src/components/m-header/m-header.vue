<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">nhclike Music</h1>
    <router-link tag="div" class="mine" to="/userCenter">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script  type="text/ecmascript-6">
  export default {
    data(){
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
  @import "./../../common/css/mixin.less";

  .m-header{
    position: relative;
    height: 44px;
    text-align: center;
    color: @color-theme;
    font-size: 0;
    .icon{
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      background-size: 30px 32px;
      .bg-image('./../image/logo');
    }
    .text{
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: @font-size-large;
    }
    .mine{
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine{
        display: block;
        padding: 12px;
        font-size: 20px;
        color: @color-theme;
      }
    }
  }

</style>
