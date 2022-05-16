<template>
  <!-- <div class="app-wrapper"> -->
  <el-scrollbar class="app-wrapper">
    <navbar v-bind:realName="realName"></navbar>
    <sidebar></sidebar>
    <div class="main-container">
      <tabs-view></tabs-view>
      <app-main></app-main>
    </div>
  </el-scrollbar>
  <!-- </div> -->
</template>
<script>
import Navbar from './navbar'
import Sidebar from './sidebar/sidebar'
import TabsView from './tabs-view'
import AppMain from './app-main'
export default {
  components: {
    Navbar,
    Sidebar,
    TabsView,
    AppMain
  },
  data(){
    return{
      realName:''
    }
  },
  mounted() {
    this.realName = localStorage.getItem('realName')
  }
}
</script>
<style scoped lang="stylus">
.app-wrapper
  position absolute
  width 100%
  height 100vh
  /deep/ .el-scrollbar__wrap
    overflow-x hidden
  .main-container
    padding-left 211px
    padding-top 61px
    background-color #fefefe
</style>
