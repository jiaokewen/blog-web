<template>
  <div>
    <Table :data="data" :columns="columns" stripe>
    </Table>
    <div v-if="total > 0" style="margin: 10px; overflow: hidden;">
      <div style="float: right; ">
          <Page :total="total" :current="currentPage" show-elevator show-total
            @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import Util from '@/utils/util'
import sysDictService from '@/service/SysDict'

export default {
  props: ['data', 'total', 'currentPage'],
  data () {
    return {
      columns: [{
        title: '文章标题',
        key: 'title',
        align: 'center'
      }, {
        title: '创建人',
        key: 'userName',
        align: 'center'
      }, {
        title: '创建时间',
        key: 'createTime',
        align: 'center',
        render: (h, params) => {
          return h('div', Util.formatDate(this.data[params.index].createTime, 'yyyy-MM-dd hh:mm'))
        }
      }, {
        title: '是否为草稿',
        key: 'isDelete',
        align: 'center',
        render: (h, params) => {
          return h('Tag', {
            props: {
              color: this.data[params.index].isDelete === '1' ? 'green' : 'red'
            }
          }, sysDictService.translate('is_delete', this.data[params.index].isDelete))
        }
      }, {
        title: '操作',
        align: 'center',
        width: 250,
        render: (h, params) => {
          let item = this.data[params.index]
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                icon: 'edit'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$emit('edit', item.cid)
                }
              }
            }),
            h('Button', {
              props: {
                type: 'error',
                size: 'small',
                icon: 'trash-a'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$emit('del', item)
                }
              }
            })
          ])
        }
      }]
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>
