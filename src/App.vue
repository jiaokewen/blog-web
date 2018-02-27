<template>
  <router-view class="fs-text" id="app"></router-view>
</template>

<script>
export default {
  name: 'app',

  mounted () {
    this.$Message.config({
      top: 50,
      duration: 6
    })
    // this.$router.push('/')
  }
}
</script>

<style lang="less">
@import './assets/css/theme.less';
</style>
