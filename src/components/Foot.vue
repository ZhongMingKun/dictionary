<template>
  <div class="footer" @click="showList">
    <div class="tab-item">
      <router-link to="/search">
        <div class="link">
          <img src="../../common/img/ic_menu_local.png"><br>
          <div class="link-font">汉字检索</div>
        </div>
      </router-link>
    </div>

    <div class="tab-item">
      <router-link to="/side">
        <div class="link">
          <img src="../../common/img/ic_menu_online.png"><br>
          <div class="link-font">偏旁检索</div>
        </div>
      </router-link>
    </div>

    <div class="tab-item">
      <router-link to="/spell">
        <div class="link">
          <img src="../../common/img/ic_menu_bookmark.png"><br>
          <div class="link-font">拼音检索</div>
        </div>
      </router-link>
    </div>

    <div class="tab-item">
      <router-link to="/history">
        <div class="link">
          <div class="book-icon"><i class="icon-book"></i></div>
          <div class="link-font">历史记录</div>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions(['showList'])
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/icon";
  @import '../../common/less/mixin';

  .footer {
    position: fixed;
    display: flex;
    height: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
    z-index: 1;
    background: rgb(19, 123, 191);
    .tab-item {
      flex: 1;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 0;
      }
      .book-icon {
        color: #ccc;
      }
      img {
        width: 16px;
        height: 16px;
      }
      & > a {
        display: block;
        padding: 4px 12px;
        color: #fff;
        text-align: center;
        border-radius: 3px;
        text-decoration: none;
        &.active {
          background: #7f7a76;
          text-decoration: none;
        }
      }
    }
  }
</style>
