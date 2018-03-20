<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="110"> <!-- 更换表单 -->
    <FormItem label="链接名称:" prop="name">
      <Input v-model="dataModel.name"  :disabled="disabled" placeholder="请输入链接名称" style="width: 230px"></Input>
    </FormItem>
    <FormItem label="链接地址:" prop="url">
      <Input v-model="dataModel.url"  :disabled="disabled" placeholder="请输入链接地址" style="width: 230px"></Input>
    </FormItem>
  </Form>
</template>

<script>
import TargetApi from '@/api/ContentType' // 更换对应的API接口

export default {
  props: ['disabled'],
  data () {
    return {
      dataModel: { // 更换表单内容
        id: '',
        name: '',
        url: ''
      },
      typeList: [],
      rules: { // 更换规则
        name: [
          { required: true, message: '链接名称不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '链接名称不能大于16', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' },
          { type: 'url', max: 100, message: '请输入有效链接', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$emit('onSave', this.dataModel)
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    cancel () {
      this.$emit('onCancel')
    },
    initData (initData) {
      this.reSetForm()
      this.dataModel.id = initData.id
      this.dataModel.name = initData.name
      this.dataModel.url = initData.url
    },
    reSetForm () {
      this.$refs.dataForm.resetFields()
      this.dataModel.id = ''
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: 30px;
  width: 500px;
}

.btn {
  width: 100px;
}
</style>
