<template>
  <div>
    <ul>
      <li v-for="item in fontData" @click="getFont(item)">
        <router-link to="/fontdetail">
          <div class="font-list">
            <div class="list-content border">
              <div class="font-wrapper">{{item.zi}}</div>
              <div class="font-des">
                <div class="font-spell">{{item.pinyin}}</div>
                <div class="side-and-strokes">
                  <div class="font-side"><span class="title">部首:</span><span class="text">{{item.bushou}}</span></div>
                  <div class="font-strokes"><span class="title">笔画:</span><span class="text">{{item.bihua}}</span>
                  </div>
                </div>
              </div>
              <div class="to-font-detail"></div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="get-more" v-show="getMore">上拉加载更多...</div>
    <div class="no-more" v-show="noMore">没有更多了</div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    props: {
      fontData: {
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions(['getFontID', 'hideList', 'addToHistory']),
      getFont(font) {
        this.getFontID(font.id)
        this.addToHistory(font)
        this.hideList()
      }
    },
    computed: {
      ...mapGetters(['getMore', 'noMore'])
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

  li:last-of-type {
    .list-content {
      .border-none
    }
  }

  .list-content {
    display: flex;
    height: 100%;
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
  .get-more, .no-more{
    text-align: center;
  }
</style>
