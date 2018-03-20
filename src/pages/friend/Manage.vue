<template>
<div>
  <Modal v-model="modal1" title="友情链接信息" width="35" :mask-closable='false'>
    <data-form ref="dataForm" :disabled="disabled" @onSave="save"></data-form>
    <div slot="footer">
      <Button @click="submit" type="info" v-if="btn" :loading="loading">提交</Button>
      <Button @click="close" type="info">关闭</Button>
    </div>
  </Modal>
  <search-form @doSearch="doSearch" class="search-form">
  </search-form>
  <Row class="toolbar">
    <Button @click="add" type="success" shape="circle" icon="plus">添加</Button>
  </Row>
  <manage-table :data="data" :total="total" :currentPage="currentPage" 
    @view="view" @edit="edit" @pageChange="pageChange" @del="del">
  </manage-table>
</div>
</template>

<script>
import SearchForm from './SearchForm'
import ManageTable from './Table'
import DataForm from './DataForm'
import TargetApi from '@/api/Friend' // 更换对应的API接口

export default {
  data () {
    return {
      params: {},
      data: [],
      total: 1,
      currentPage: 1,
      pageSize: 10,
      modal1: false,
      loading: false,
      btn: true,
      disabled: false,
      isEdit: true
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.$indicator.open()
      TargetApi.search({
        exampleJson: JSON.stringify(this.params),
        page: this.currentPage,
        rows: this.pageSize
      }).then(resp => {
        if (resp.success) {
          this.total = resp.total
          this.data = resp.rows
        } else {
          this.$Message.error('加载数据失败')
          this.$indicator.close()
        }
        this.$indicator.close()
      }).catch(err => {
        this.$Notice.error({ title: '加载数据失败', desc: err })
        this.$indicator.close()
      })
    },

    doSearch (params) {
      this.currentPage = 1
      this.params = params
      this.loadData()
    },
    save (item) {
      this.loading = true
      if (this.isEdit) {
        TargetApi.edit(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '更新友情链接成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '更新友情链接失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '更新友情链接失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      } else {
        TargetApi.add(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '新增友情链接成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '新增友情链接失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '新增友情链接失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      }
    },
    add () {
      this.$refs.dataForm.reSetForm()
      this.isEdit = false
      this.modal1 = true
      this.btn = true
      this.disabled = false
    },
    view (item) {
      this.$refs.dataForm.initData(item)
      this.modal1 = true
      this.btn = false
      this.disabled = true
    },
    edit (item) {
      this.$refs.dataForm.initData(item)
      this.isEdit = true
      this.modal1 = true
      this.btn = true
      this.disabled = false
    },
    del (item) {
      this.$Modal.confirm({
        title: '删除确认',
        content: `确认要删除吗?`,
        onOk: () => {
          this.$indicator.open()
          TargetApi.delete(item).then(resp => {
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
    submit () {
      this.$refs.dataForm.submit()
    },
    close () {
      this.modal1 = false
      this.$refs.dataForm.reSetForm()
    },
    pageChange (page) {
      this.currentPage = page
      this.loadData()
    }
  },
  components: {
    SearchForm, ManageTable, DataForm
  }
}
</script>
