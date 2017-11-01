<template>
  <div class="content">
    <div class="font-sum">
      <div class="font-wrapper">{{fontDetail.zi}}</div>
      <div class="detail-wrapper">
        <p><span>偏旁:{{fontDetail.bushou}}</span><span>笔画:{{fontDetail.bihua}}</span></p>
        <p><span>拼音:{{fontDetail.pinyin}}</span><span>五笔:{{fontDetail.wubi}}</span></p>
      </div>
    </div>
    <div class="font-des">
      <h2 class='border'>基本解释</h2>
      <p v-for="item in fontDetail.jijie">{{item}}</p>
    </div>
    <div class="font-detail">
      <h2>详细解释</h2>
      <p v-for="item in fontDetail.xiangjie">{{item}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as api from '../api'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['newFont', 'fontDetail'])
    },
    methods: {
      ...mapActions(['getFontDetail', 'resetFontDetail'])
    },
    created() {
      let self = this
      this.$nextTick(() => {
        api.getFontDetailById(this.newFont, function (data) {
          self.getFontDetail(data.result)
        })
      })
    },
    destroyed() {
      this.resetFontDetail()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";
  .content {
    padding-bottom: 48px;
  }
  .font-sum {
    display: flex;
    padding: 8px;
    background: #F2EBE1;
    .font-wrapper {
      flex: 0 0 72px;
      margin-right: 8px;
      width: 72px;
      height: 72px;
      font-size: 48px;
      line-height: 72px;
      text-align: center;
      .bgUrl('cell_bg.png');
      background-size: 72px;
    }
    .detail-wrapper {
      flex: 1;
      p {
        display: flex;
        margin-top: 4px;
        &:last-of-type {
          margin-top: 12px;
        }
        span {
          flex: 1;
          font-size: 18px;
          &:last-of-type {
            margin-left: 8px;
          }
        }
      }
    }
  }

  .font-des, .font-detail {
    margin-top: 8px;
    padding: 8px;
    h2 {
      margin-bottom: 8px;
      padding-bottom: 8px;
      font-size: 20px;
      color: #A36A23;
      .border-1px(#8E816E)
    }
    p {
      margin-top: 5px;
      font-size: 18px;
    }
  }
</style>
