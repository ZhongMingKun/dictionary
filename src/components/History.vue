<template>
  <div class="history-show">
    <div class="history" v-if="historyData.length">
      <FontList :fontData="historyData"></FontList>
    </div>
    <div class="no-history" v-else>
      <div class="none-bg"></div>
      <p>暂无历史记录,赶紧开始搜索学习吧</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FontList from './FontList'

  export default {
    data() {
      return {}
    },
    components: {
      FontList
    },
    computed: {
      ...mapGetters(['historyData'])
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .no-history {
    text-align: center;
    color: #9A5919;
    .none-bg {
      margin: 30px auto;
      width: 240px;
      height: 240px;
      .bgUrl("no_data_icon.png")
    }
  }
</style>
