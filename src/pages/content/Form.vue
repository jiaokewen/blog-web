<template>
  <div>
  <Form ref="form" class="form" :model="blogContent" :rules="rules" :label-width="80">
    <FormItem label="标题" prop="title">
      <Input  v-model="blogContent.title" placeholder="请输入标题" ></Input>
    </FormItem>
    <FormItem label="描述" prop="contentRemark">
      <Input v-model="blogContent.contentRemark" placeholder="请输入描述" ></Input>
    </FormItem>
    <FormItem label="文章类型" prop="typeId">
      <Cascader :data="typeData" v-model="blogContent.typeId"></Cascader>
    </FormItem>
    <FormItem label="内容">
      <summer-note ref="summernote" @getCode='getCode'></summer-note>
    </FormItem>
    <FormItem label="允许评论" prop="allowComment">
      <i-switch v-model="blogContent.StatusOn" size="large">
        <span slot="open">启用</span>
        <span slot="close">禁用</span>
      </i-switch>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="click">确定</Button>
      <Button @click="cancel" class="btn" type="ghost" style="margin-left: 8px">取消</Button>
    </FormItem>
    </Form>
  </div>
</template>
<script>
import Api from '@/api/Content'
import TypeApi from '@/api/ContentType'
import SummerNote from '@/components/SummerNote'

export default {
  data() {
    return {
      typeData: [],
      blogContent: {
        cid: null,
        title: "",
        typeId: [],
        contentRemark: "",
        allowComment: "",
        content: "",
        StatusOn: false
      },
      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        contentRemark: [
          { required: true, message: "文章描述不能为空", trigger: "blur" }
        ],
        typeId: [
          { required: true, type: 'array', message: "请选择文章类型", trigger: "blur"}
        ]
      }
    };
  },
  components: {
    SummerNote
  },
  mounted () {
    TypeApi.search({
      page: 1,
      rows: -1,
      exampleJson: {}
    }).then(resp => {
      if (resp.success) {
        this.typeData = this.getArry(resp.rows)
      } else {
        this.$Message.error("获取文章类型信息失败")
      }
    }).catch(err => {
      this.$Notice.error({ title: "获取文章类型信息失败", desc: err })
    })
  },
  methods: {
    click () {
      this.$refs.summernote.click()
    },
    getArry (arry) {
      arry.map(item => {
        item.value = item.typeId
        item.label = item.typeName
        if (item.children) {
          this.getArry(item.children)
        }
      })
      return arry
    },
    getCode (val) {
      this.blogContent.content = val
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.blogContent.StatusOn) {
            this.blogContent.allowComment = "1";
          } else {
            this.blogContent.allowComment = "0";
          }
          this.$emit("onSave", this.blogContent);
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    cancel() {
      this.$emit("onCancel");
    },
    initData (item) {
      this.blogContent.cid = item.cid
      this.blogContent.title = item.title
      this.blogContent.typeId = [1, 2, 3]
      this.blogContent.contentRemark = item.contentRemark
      this.$refs.summernote.initConent(item.content)
      if (item.allowComment === "1") {
        this.blogContent.StatusOn = true;
      } else {
        this.blogContent.StatusOn = false;
      }
    }
  }
}
</script>
