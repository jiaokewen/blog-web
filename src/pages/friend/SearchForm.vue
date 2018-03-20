<template>
  <Form ref="searchForm" :model="searchForm" :label-width="80" inline> <!-- 更换表单 -->
    <FormItem class="form-item" label="链接名称:" prop="name">
      <Input v-model.trim="searchForm.name" placeholder="请输入链接名称"></Input>
    </FormItem>
    <FormItem class="form-item">
      <Button @click="doSearch" type="primary" icon="ios-search">搜索</Button>
      <Button @click="doReset" type="ghost" icon="loop" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>

<script>

export default {
  data () {
    return {
      searchForm: { // 更换表单内容
        name: ''
      }
    }
  },

  methods: {
    doSearch () { // 更换表单内容
      let param = {
        name: ''
      }
      if (this.searchForm.name) {
        param.name = this.searchForm.name
      }
      this.$emit('doSearch', param)
    },

    doReset () {
      this.$refs.searchForm.resetFields()
      this.$emit('doSearch', {})
    }
  }
}
</script>
