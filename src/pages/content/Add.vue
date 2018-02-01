<template>
  <div>
    <content-form @onSave="onSave"  @onCancel="onCancel"></content-form>
  </div>
</template>
<script>
import ContentForm from './Form'
import Api from '@/api/Content'
export default {
  methods: {
    onSave (item) {
      this.$indicator.open()
      Api.create(item).then(resp => {
        if (resp.success) {
          this.$Notice.success({ title: '操作成功', content: '添加成功' })
          this.$router.go(-1)
        } else {
          this.$Message.error(`添加失败：${resp.message}`)
        }
        this.$indicator.close()
      }).catch(err => {
        this.$Message.error(`添加失败：${err.message || ''}`)
        this.$indicator.close()
      })
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  components: {
    ContentForm
  }
}
</script>
<style>
</style>
