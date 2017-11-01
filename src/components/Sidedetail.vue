<template>
  <div>
    <div v-if="fontList.length === 0">
      <span>loading</span>
    </div>
    <div class="font-view">
      <router-view></router-view>
    </div>
    <div class="list-wrapper" v-if="fontList.length" v-show="isShowList" ref="listWrapper">
      <FontList :fontData="fontList"></FontList>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'
  import FontList from './FontList'
  import * as api from '../api'

  export default {
    data() {
      return {
        totalPage: 0,
        nextPage: false
      }
    },
    components: {
      FontList
    },
    methods: {
      ...mapActions([
        'getFontID',
        'getFontData',
        'hideList',
        'addToHistory',
        'hideGetMoreDiv',
        'showGetMoreDiv',
        'hideNoMoreDiv',
        'showNoMoreDiv',
        'loadNewSideList',
        'resetSidePage'
      ]),
      getFontIDBySide(font) {
        this.getFontID(font.id)
        this.addToHistory(font)
        this.hideList()
      },
      initListScroll() {
        let self = this
        if (this.$refs.listWrapper) {
          this.sideScroll = new IScroll(this.$refs.listWrapper, {
            click: true,
            probeType: 3
          })
          this.sideScroll.on('scroll', function () {
            if ((this.maxScrollY - this.y) > 30) {
              if (self.currMaxPage < self.totalPage) {
                self.nextPage = true
                self.showGetMoreDiv()
              } else {
                self.showNoMoreDiv()
              }
            }
          })
          this.sideScroll.on('scrollEnd', function () {
            if (self.nextPage) {
              self.loadNewSideList()
              self.sideScroll.scrollTo(0, this.y - 100)
              self.nextPage = false
            }
            self.hideGetMoreDiv()
            self.hideNoMoreDiv()
          })
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.initListScroll()
      })
    },
    destroyed() {
      this.totalPage = 0
      this.resetSidePage()
    },
    computed: {
      ...mapGetters({
        word: 'newSide',
        fontList: 'fontListBySide',
        isShowList: 'isShowList',
        currMaxPage: 'sideCurrMaxPage',
        listLen: 'sideListLen'
      })
    },
    watch: {
      word(newVal) {
        this.getFontData('')
        let self = this
        api.getSideDetail(newVal, this.currMaxPage, function (data) {
          self.getFontData(data.result.list)
          self.totalPage = data.result.totalpage
        })
      },
      listLen(newVal, oldVal) {
        if (oldVal === 0) {
          this.$nextTick(() => {
            this.initListScroll()
          })
        } else if (newVal) {
          this.$nextTick(() => {
            this.sideScroll.refresh()
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  a {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    color: #000;
    &.active {
      color: #000;
    }
  }

  .font-list {
    padding: 8px;
    padding-bottom: 0;
    list-style: none;
    box-sizing: border-box;
  }

  .list-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .list-content {
    display: flex;
    padding-bottom: 8px;
    .border-1px(rgba(0, 0, 0, 0.4));
    .font-wrapper {
      flex: 0 0 72px;
      width: 72px;
      height: 72px;
      text-align: center;
      line-height: 72px;
      font-size: 42px;
      .bgUrl('cell_bg.png');
      background-size: 72px 72px;
      .bgUrl("cell_bg1.png");
    }
    .font-des {
      flex: 1;
      margin: 0 8px;
      padding-top: 16px;
      font-size: 18px;
      .side-and-strokes {
        display: flex;
        margin-top: 4px;
        .text {
          color: #9A5919
        }
        .font-side {
          flex: 1;
        }
        .font-strokes {
          flex: 1;
        }
      }
    }
    .to-font-detail {
      flex: 0 0 12px;
      width: 12px;
      margin-right: 4px;
      .bgUrl("submenu_normal.png");
      background-size: 12px 12px;
    }
  }
</style>
