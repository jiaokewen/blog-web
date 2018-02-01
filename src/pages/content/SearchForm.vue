<template>
  <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
    <FormItem class="form-item" label="文章标题" prop="title">
      <Input v-model="searchForm.title" placeholder="请输入文章标题"></Input>
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
        title: ""
      }
    };
  },

  methods: {
    doSearch() {
      let param = {};
      if (this.searchForm.title) {
        param.title = this.searchForm.title;
      }
      this.$emit("doSearch", param);
    },

    doReset() {
      this.$refs.searchForm.resetFields();
      this.$emit("doSearch", {});
    }
  }
};
</script>
