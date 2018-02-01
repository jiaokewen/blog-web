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
        title: '开启评论',
        key: 'allowComment',
        align: 'center'
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
