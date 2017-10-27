<template>
  <div class="spell-content">
    <div class="spell" ref="spellList">
      <ul>
        <li v-for="item in spellData" class="letter">
          <h2 ref="listTitle">{{item.letter}}</h2>
          <ul class="spell-ul">
            <li v-for="spell in item.result" class="spell-wrapper" @click="getSpell(spell.pinyin)">
              <router-link to="/spelldetail">
                <div class="link-item">
                  {{spell.pinyin}}
                </div>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="aside-nav">
      <ul>
        <li v-for="item in spellData" @click="barScrollTo(item.letter)"><div>{{item.letter}}</div></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: {
      spell: {
        type: Array
      }
    },
    data() {
      return {
        spellData: [],
        listTitleTop: {}
      }
    },
    methods: {
      init(data) {
        for (let i = 0; i < 26; i++) {
          let letter = String.fromCharCode(65 + i)
          if (letter === 'I' || letter === 'U' || letter === 'V') {
            letter.delete
            continue
          }
          var results = []
          data.forEach((item, index) => {
            if (item.pinyin_key === letter) {
              results.push(item)
            }
          })
          this.spellData.push({letter, result: results})
        }
      },
      getTitleScrollTop(elArr) {
        if (elArr) {
          elArr.forEach((el) => {
            this.listTitleTop[el.innerHTML] = el.offsetTop - 100
          })
        }
      },
      barScrollTo(letter) {
        window.scrollTo(0, this.listTitleTop[letter])
      },
      ...mapActions(['getSpell'])
    },
    created() {
      this.init(this.spell)
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
  .spell-content {
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
  .spell {
    height: 100%;
    li {
      list-style: none;
    }

    .letter {
      h2 {
        margin: 0 10px;
        padding-top: 10px;
        font-size: 24px;
        font-weight: 600;
      }
    }

    .spell-ul {
      margin: 0 10px;
      padding: 10px 5px 48px 5px;
    }

    .spell-wrapper {
      display: inline-block;
      margin: 5px;
      padding: 15px 0;
      width: 80px;
      font-size: 20px;
      text-align: center;
      border: 1px solid #000;
      border-radius: 10px;
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
