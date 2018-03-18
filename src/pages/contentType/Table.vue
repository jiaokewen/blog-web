<template>
  <div>
    <Table :data="data" height="350" :columns="columns" stripe>
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

export default {
  props: ['data', 'total', 'currentPage'],
  data () {
    return {
      columns: [{
        title: 'ID',
        key: 'typeId',
        align: 'center'
      }, {
        title: '类别名',
        key: 'typeName',
        align: 'center'
      }, {
        title: '创建时间',
        key: 'createTime',
        align: 'center'
      }, {
        title: '父级ID',
        key: 'typeTypeId',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        width: 280,
        render: (h, params) => {
          let item = this.data[params.index]
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                icon: 'search'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$emit('view', item)
                }
              }
            }),
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
                  this.$emit('edit', item)
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
