<template>
    <Select :value="value"
      @on-change="change"
      clearable
      placeholder="请选择">
    <Option v-for="item in dict" :value="item.dictItemCode" :key="item.dictItemCode">
      {{ item.dictItemValue }}
    </Option>
  </Select>
</template>
<script>

export default {
  props: ['dictName', 'value'],

  mounted () {
    this.dict = [
      {dictItemValue: '开启', dictItemCode: 'open'},
      {dictItemValue: '关闭', dictItemCode: 'close'}
    ]
  },

  data () {
    return {
      dict: []
    }
  },

  methods: {
    change (value) {
      this.$emit('input', value)
      this.$emit('onChange')
    }
  }
}
</script>

<style lang="less" scoped>
</style>


