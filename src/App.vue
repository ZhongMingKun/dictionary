<template>
  <div id="app">
    <AppHead></AppHead>
    <div class="content">
      <router-view :spell="pinyinList"></router-view>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import AppHead from './components/AppHead'
  import Foot from './components/Foot'
  import * as api from './api'

  export default {
    name: 'app',
    data() {
      return {
        pinyinList: []
      }
    },
    components: {
      AppHead,
      Foot
    },
    methods: {
      getWindowsHeight() {
        document.querySelector('.content').style.height = window.innerHeight - 96 + 'px'
      }
    },
    created() {
      let self = this
      api.getPinYinList(function (data) {
        data.forEach((item) => {
          self.pinyinList.push(item)
        })
      })
      this.$nextTick(() => {
        this.getWindowsHeight()
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/less/mixin";

  #app {
    .content {
      margin-top: 50px;
      margin-bottom: 46px;
      z-index: -1;
      div {
        height: 100%;
      }
    }
  }
</style>
