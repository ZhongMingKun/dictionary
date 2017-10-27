<template>
  <div class="header">
    <div class="back" @click="this.goBack">返回</div>
    <div class="title">新华字典</div>
    <div class="mark">书签</div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions(['showList']),
      goBack() {
        this.$router.go(-1)
        this.showList()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .header {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 5px 9px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    z-index: 1;
    background: url("../../common/img/title_header_bg.9.png") center center no-repeat;
    background-size: 100%;
    .title {
      flex: 1;
      background: url("../../common/img/intro_btn_normal.png") no-repeat center center;
      background-size: 135px 46px;
      font-size: 20px;
      line-height: 40px;
    }
    .back, .mark {
      flex: 0 0 50px;
      padding: 5px;
      background: url("../../common/img/title_bar_normal.9.png") center center no-repeat;
      background-size: 40px 40px;
    }

  }
</style>
