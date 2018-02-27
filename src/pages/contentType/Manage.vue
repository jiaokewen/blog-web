<template>
  <div>
  <Modal v-model="modal1" title="类别信息" width="25" :styles="{top: '45px'}" :mask-closable='false'>
    <data-form ref="dataForm" :disabled="disabled" @onSave="save"></data-form>
    <div slot="footer">
      <Button @click="submit" type="info" v-if="btn" :loading="loading1">提交</Button>
      <Button @click="close" type="info">关闭</Button>
    </div>
  </Modal>
  <Row>
    <Col span="4">
      <Card :bordered="true">
        <p slot="title">文章类别</p>
        <div style="height: 400px">
          <Tree :data="treeData" @on-select-change="selectChane"></Tree>
        </div>
      </Card>
    </Col>
    <Col span="20">
      <Card :bordered="true">
        <p slot="title">类目信息</p>
        <div style="height: 410px">
          <manage-table :data="data" @view="view" @edit="edit" :loading="loading" :total="total" :currentPage="currentPage" @pageChange="pageChange">
          </manage-table>
        </div>
      </Card>
    </Col>
  </Row>
  </div>
</template>
<script>
import DataForm from './DataForm'
import TargetApi from '@/api/ContentType' // 更换对应的API接口

export default {
  data () {
    return {
      params: {},
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      treeData: [],
      loading: false,
      loading1: false,
      btn: true,
      disabled: false,
      isEdit: true,
      modal1: false
    }
  },
  mounted () {
    this.loadArea()
  },
  methods: {
    getArry (arry) {
      arry.map(item => {
        item.title = item.dictName
      })
      arry[0].selected = true
      return arry
    },
    selectChane (item) {
      this.params.dictCode = item[0].dictCode
      this.loadData()
    },
    loadArea () {
      TargetApi.search4tree().then(resp => {
        if (resp) {
          this.treeData = this.getArry(resp)
          this.params.dictCode = resp[0].dictCode
          this.params.dictId = resp[0].dictId
          this.loadData()
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
    loadData () {
      this.loading = true
      TargetApi.search({
        exampleJson: JSON.stringify(this.params),
        page: this.currentPage,
        rows: this.pageSize
      }).then(resp => {
        if (resp) {
          this.data = resp.rows
          this.total = resp.total
        } else {
          this.$Message.error('加载数据失败')
          this.loading = false
        }
        this.loading = false
      }).catch(err => {
        this.$Notice.error({ title: '加载数据失败', desc: err })
        this.loading = false
      })
    },
    save (item) {
      this.loading = true
      item.dictCode = this.params.dictCode
      item.dictId = this.params.dictId
      if (item.dictItemId !== '') {
        TargetApi.edit(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '更新字典信息成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '更新字典信息失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '更新字典信息失败', desc: err })
          this.loading = false
          this.modal1 = false
        })
      } else {
        TargetApi.add(item).then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: '新增字典信息成功', desc: resp.message })
            this.loading = false
            this.modal1 = false
            this.loadData()
          } else {
            this.$Notice.success({ title: '新增字典信息失败', desc: resp.message })
          }
          this.loading = false
          this.modal1 = false
        }).catch(err => {
          this.$Notice.error({ title: '新增字典信息失败', desc: err })
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
    ManageTable, DataForm
  }
}
</script>
