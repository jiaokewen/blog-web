<template>
  <div class="refresh-wrapper">
    <div class="text-silver">最后刷新时间：{{time}}</div>
    <Button type="text" shape="circle" @click="refresh">
      <Icon type="refresh" color="green" :size="18"></Icon>
    </Button>
  </div>
</template>

<script>
export default {
  props: ['time'],

  methods: {
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="less" scoped>
.refresh-wrapper{
  display: flex;
  align-items: center;
  width: 282px;
  position: absolute;
  right: 0px;
  top: 6px;
  z-index: 995;
}
</style>
