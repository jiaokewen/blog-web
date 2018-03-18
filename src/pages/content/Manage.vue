<template>
  <div>
    <search-form @doSearch="doSearch"></search-form>
    <Row class="toolbar">
      <Button @click="add" type="success" shape="circle" icon="plus">添加文章</Button>
    </Row>
    <content-table :data="data" :total="total" :currentPage="currentPage" @pageChange="pageChange" @del="del" @edit="edit">
    </content-table>
  </div>
</template>
<script>
import SearchForm from "./SearchForm"
import ContentTable from "./Table"
import Api from "@/api/Content"
import * as R from "@/router/router-types"
export default {
  data() {
    return {
      params: {},
      data: [],
      total: 1,
      currentPage: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    doSearch(params) {
      this.currentPage = 1
      this.params = params
      this.loadData()
    },
    add() {
      this.$router.push({ path: R.kContentAdd });
    },
    del (item) {
      this.$Modal.confirm({
        title: '删除确认',
        content: `确认要删除吗?`,
        onOk: () => {
          this.$indicator.open()
          Api.delete(item).then(resp => {
            if (resp.success) {
              this.$Notice.success({ title: '删除成功' })
              this.loadData()
            }
            this.$indicator.close()
          }).catch(err => {
            this.$Message.error(`删除失败(${err.message || ''})`)
            this.$indicator.close()
          })
        }
      })
    },
    loadData() {
      this.$indicator.open()
      Api.search({
        page: this.currentPage,
        rows: this.pageSize,
        exampleJson: JSON.stringify(this.params)
      }).then(resp => {
          if (resp.success) {
            this.total = resp.total;
            this.data = resp.rows;
          } else {
            this.$Message.error("加载数据失败");
            this.$indicator.close();
          }
          this.$indicator.close();
        })
        .catch(err => {
          this.$Notice.error({ title: "加载数据失败", desc: err });
          this.$indicator.close();
        })
    },

    edit(cid) {
      this.$router.push({
        name: "ContentEdit",
        params: {
          cid
        }
      })
    },
    pageChange(page) {
      this.currentPage = page;
      this.loadData();
    }
  },
  components: {
    SearchForm,
    ContentTable
  }
};
</script>