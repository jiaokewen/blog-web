<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="90"> <!-- 更换表单 -->
    <FormItem label="名称:" prop="dictItemValue">
      <Input v-model="dataModel.dictItemValue"  :disabled="disabled" placeholder="请输入名称" style="width: 170px"></Input>
    </FormItem>
    <FormItem label="数据编码:" prop="dictItemCode">
      <Input v-model="dataModel.dictItemCode" :disabled="disabled" placeholder="请输入数据编码" style="width: 170px"></Input>
    </FormItem>
    <FormItem label="等级:" prop="sortNumber">
      <Input v-model="dataModel.sortNumber" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" :disabled="disabled" placeholder="请输入等级" style="width: 170px"></Input>
    </FormItem>
  </Form>
</template>

<script>

export default {
  props: ['disabled'],
  data () {
    return {
      dataModel: { // 更换表单内容
        dictItemId: '',
        dictId: '',
        dictItemStatus: '1',
        dictItemValue: '',
        dictItemCode: '',
        sortNumber: '',
        note: '',
        createTime: ''
      },
      rules: { // 更换规则
        dictItemValue: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '名称不能大于16', trigger: 'blur' }
        ],
        dictItemCode: [
          { required: true, message: '数据编码不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '数据编码不能大于16', trigger: 'blur' }
        ],
        sortNumber: [
          { required: true, message: '等级不能为空', trigger: 'blur' },
          { type: 'string', max: 12, message: '等级不能大于12', trigger: 'blur' }
        ]
      }
    }
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
      this.dataModel.dictItemId = initData.dictItemId
      this.dataModel.dictItemValue = initData.dictItemValue
      this.dataModel.dictItemCode = initData.dictItemCode
      this.dataModel.dictId = initData.dictId
      this.dataModel.note = initData.note
      this.dataModel.createTime = initData.createTime
      this.dataModel.sortNumber = initData.sortNumber.toString()
    },
    reSetForm () {
      this.$refs.dataForm.resetFields()
      this.dataModel.dictItemId = ''
      this.dataModel.dictId = ''
      this.dataModel.note = ''
      this.dataModel.createTime = ''
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
