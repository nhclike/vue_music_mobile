<template>
  <div>
    <h1>hello world</h1>
    <h2>this is a main router-view</h2>
    <div>
      <p>this is a less style</p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    }
  };
</script>

<style scoped lang="less">

@import "./../common/css/variable.less";
@import "./../common/css/test.less";

  h1{
    color: #fff;
  }
  div{
    p{
      color:#000;
      font-size: 10px;
      border: 1px solid #fff;
      background: #fff;
    }
  }
</style>
