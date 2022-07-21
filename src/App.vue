<template>
  <div id="app">
    <!--//保持页面状态，可以降低能耗,但是有些页面需要热更新的id之类要exclude-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  // import MainTabBar from "./components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
