<template>
  <div class="side-content">
    <div class="side" ref="sideList">
      <ul>
        <li v-for="item in sideData" class="strokes">
          <h2 ref="listTitle">笔画数:{{item.strokes}}</h2>
          <ul class="side-ul">
            <li v-for="side in item.result" class="side-wrapper" @click="getSide(side.bushou)">
              <router-link to='/sidedetail'>
                <div class="link-item">
                  {{side.bushou}}
                </div>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="aside-nav">
      <ul>
        <li v-for="item in sideData" @click="barScrollTo(item.strokes)"><div>{{item.strokes}}</div></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import * as api from '../api'
  export default {
    props: {
      side: {
        type: Array
      }
    },
    data() {
      return {
        sideData: [],
        listTitleTop: {}
      }
    },
    methods: {
      init(data) {
        let maxStrokes = data[data.length - 1].bihua
        for (let i = 0; i < maxStrokes; i++) {
          let strokes = i + 1
          var results = []
          data.forEach((item) => {
            if (parseInt(item.bihua) === strokes) {
              results.push(item)
            }
          })
          this.sideData.push({strokes, result: results})
        }
      },
      ...mapActions(['getSide']),
      getTitleScrollTop(elArr) {
        if (elArr) {
          elArr.forEach((el, index) => {
            this.listTitleTop[index + 1] = el.offsetTop - 100
          })
        }
      },
      barScrollTo(index) {
        window.scrollTo(0, this.listTitleTop[index])
      }
    },
    created() {
      api.getBuShouList(this.init)
      this.$nextTick(() => {
        if (this.$refs.listTitle) {
          this.getTitleScrollTop(this.$refs.listTitle)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .side-content {
    display: flex;
    .side {
      flex:1;
    }
    .aside-nav {
      position: fixed;
      right: 10px;
      flex: 0 0 16px;
      padding-top: 10px;
      width: 16px;
      height: 80%;
      box-sizing: border-box;
    }
  }
  .aside-nav {
    ul {
      height: 100%;
      display:flex;
      flex-direction: column;
      li {
        position: relative;
        flex: 1;
        list-style: none;
        text-align: center;
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          padding: 5px;
          transform: translate3d(-50%,-50%,0);
        }
      }
    }
  }
  .side {
    height: 100%;
    /*overflow: hidden;*/
    li {
      list-style: none;
    }

    .strokes {
      h2 {
        margin: 0 10px;
        padding-top: 10px;
        font-size: 24px;
        font-weight: 600;
      }
    }

    .side-ul {
      margin: 0 8px;
      padding: 10px 5px 48px 5px;
    }

    .side-wrapper {
      display: inline-block;
      width: 72px;
      height: 72px;
      text-align: center;
      line-height: 72px;
      font-size: 36px;
      .bgUrl('cell_bg.png');
      background-size: 72px 72px;
      & > a {
        text-decoration: none;
        color: #000;
        &.active {
          color: #000;
        }
      }
    }
  }
</style>
