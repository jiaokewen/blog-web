<template>
  <Form ref="dataForm" :model="dataModel" :rules="rules" :label-width="110"> <!-- 更换表单 -->
    <FormItem label="分类名称:" prop="typeName">
      <Input v-model="dataModel.typeName"  :disabled="disabled" placeholder="请输入分类名称" style="width: 170px"></Input>
    </FormItem>
    <FormItem label="父级分类:" prop="typeTypeId">
      <Select :disabled="disabled" :filterable="true" v-model="dataModel.typeTypeId" style="width:200px">
        <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
      </Select>
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
        typeId: '',
        typeName: '',
        typeTypeId: ''
      },
      typeList: [],
      rules: { // 更换规则
        typeName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '分类名称不能大于16', trigger: 'blur' }
        ],
        typeTypeId: [
          {required: true, type: 'number', message: '请选择父级分类', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    TargetApi.searchvl({
      page: 1,
      rows: -1
    }).then(resp => {
        if (resp.success) {
          this.typeList = resp.rows
          this.typeList.unshift({
            typeId: -1,
            typeName: '无'
          })
        } else {
          this.$Message.error('加载数据失败')
        }
    })
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
      this.dataModel.typeId = initData.typeId
      this.dataModel.typeName = initData.typeName
      this.dataModel.typeTypeId = initData.typeTypeId
    },
    reSetForm () {
      this.$refs.dataForm.resetFields()
      this.dataModel.typeId = ''
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
