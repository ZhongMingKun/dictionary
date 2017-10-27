<template>
  <div>
    <div class="search">
      <div class="input-wrapper">
        <div class="input"><input id="search-input" type="search" v-model="mes" placeholder="输入汉字或拼音进行搜索"></div>
        <div class="close" @click="this.cancelSearch"></div>
      </div>
      <div class="btn" @click="searchStart(mes.trim())"></div>
    </div>
    <div class="search-content">
      <div v-if="!mes" class="history-show">
        <h2>历史搜索</h2>
        <div class="history" v-if="historyData.length">
          <FontList :fontData="historyData"></FontList>
        </div>
        <div class="no-history" v-else>
          <div class="none-bg"></div>
          <p>暂无历史记录,赶紧开始搜索学习吧</p>
        </div>
      </div>
      <div v-else="!mes" class="result-show">
        <h2>搜索结果</h2>
        <div class="wrapper" ref="searchList">
          <FontList :fontData="searchRes"></FontList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import FontList from './FontList'
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    props: {
      spell: {
        type: Array
      }
    },
    data() {
      return {
        mes: '',
        cnReg: /^[\u4e00-\u9fa5]{1}$/,
        enReg: /^[a-z]+$/,
        nextPage: false
      }
    },
    created() {
      this.resetSearch()
    },
    components: {
      FontList
    },
    computed: {
      ...mapGetters(['historyData', 'searchRes', 'searchTotalPage', 'currentPage'])
    },
    watch: {
      searchRes(newVal, oldVal) {
        if (newVal.length === 1) {
          return
        }
        if (newVal.length > 0 && oldVal.length === 0) {
          this.$nextTick(() => {
            this.$refs.searchList.style.height = window.innerHeight - 166 + 'px'
            this.initIScroll(this.$refs.searchList)
          })
        } else if (newVal.length > 0 && oldVal.length > 0) {
          this.$nextTick(() => {
            this.searchScroll.refresh()
          })
        }
      }
    },
    methods: {
      ...mapActions([
        'searchByCN',
        'searchBySpell',
        'emptySearch',
        'hideGetMoreDiv',
        'showGetMoreDiv',
        'hideNoMoreDiv',
        'showNoMoreDiv',
        'loadNewSearchList',
        'resetSearch'
      ]),
      searchStart(req) {
        if (!req) {
          alert('请输入正确的文本')
          return
        } else {
          this.emptySearch()
          if (this.cnReg.exec(req)) {
            this.searchByCN(req)
          }
          if (this.enReg.exec(req)) {
            console.log(this.spell)
            if (this.spell.find((spell) => spell.pinyin === req)) {
              this.searchBySpell(req)
            } else {
              alert('没找到该拼音')
            }
          }
        }
      },
      cancelSearch() {
        this.mes = null
        this.resetSearch()
      },
      initIScroll(el) {
        let self = this
        if (el) {
          this.searchScroll = new IScroll(el, {
            click: true,
            probeType: 3
          })
        }
        this.searchScroll.on('scroll', function () {
          if ((this.maxScrollY - this.y) > 50) {
            if (self.currentPage < self.searchTotalPage) {
              self.nextPage = true
              self.showGetMoreDiv()
            } else {
              self.showNoMoreDiv()
            }
          }
        })
        this.searchScroll.on('scrollEnd', function () {
          if (self.nextPage) {
            self.loadNewSearchList()
            self.searchScroll.scrollTo(0, this.y - 100)
            self.nextPage = false
          }
          self.hideGetMoreDiv()
          self.hideNoMoreDiv()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .search {
    position: fixed;
    display: flex;
    padding: 10px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background: #E2E2E2;
    z-index: 10;

    .input-wrapper {
      flex: 1;
      position: relative;
      #search-input {
        width: 100%;
        height: 32px;
        padding-left: 8px;
        outline-color: cadetblue;
        border: none;
        &::-webkit-search-cancel-button {
          -webkit-appearance: none; //此处就是去掉默认的小×
        }
      }
      .close {
        position: absolute;
        right: 5px;
        bottom: 4px;
        width: 30px;
        height: 20px;
        .bgUrl("edittext_clear_icon.png");
        background-size: 30px 20px;
      }
    }

    .btn {
      flex: 0 0 40px;
      width: 40px;
      height: 34px;
      .bgUrl("search_btn_normal.png");
      background-size: 40px 34px;
    }
  }

  .search-content {
    position: absolute;
    top: 100px;
    padding-bottom: 46px;
    width: 100%;
    h2 {
      margin-top: 8px;
      margin-left: 8px;
      color: #9A5919;
    }
    .no-history {
      text-align: center;
      color: #9A5919;
      .none-bg {
        margin: 30px auto;
        width: 240px;
        height: 240px;
        background: url("../../common/img/no_data_icon.png") center center;
      }
    }
  }

  .result-show .wrapper {
    overflow: hidden;
  }

</style>
