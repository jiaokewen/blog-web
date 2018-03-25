<template>
  <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
    <FormItem class="form-item" label="文章标题" prop="title">
      <Input v-model="searchForm.title" placeholder="请输入文章标题"></Input>
    </FormItem>
    <FormItem label="是否为草稿" class="form-item" prop="isDelete">
      <Select v-model="searchForm.isDelete" style="">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
    </FormItem>
    <FormItem >
      <Button @click="doSearch" type="primary" icon="ios-search">搜索</Button>
      <Button @click="doReset" type="ghost" icon="loop" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
import Util from "@/utils/util";

export default {
  data() {
    return {
      searchForm: {
        title: "",
        isDelete: ''
      },
      statusList: [{
        label: '是',
        value: '0'
      }, {
        label: '否',
        value: '1'
      }]
    };
  },

  methods: {
    doSearch() {
      let param = {};
      if (this.searchForm.title) {
        param.title = this.searchForm.title
      }
      if (this.searchForm.isDelete) {
        param.isDelete = this.searchForm.isDelete
      }
      this.$emit("doSearch", param)
    },

    doReset() {
      this.$refs.searchForm.resetFields()
      this.$emit("doSearch", {})
    }
  }
};
</script>
