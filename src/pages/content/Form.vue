<template>
  <div>
  <Form ref="form" class="form" :model="blogContent" :rules="rules" :label-width="80">
    <FormItem label="标题" prop="title">
      <Input  v-model="blogContent.title" placeholder="请输入标题" ></Input>
    </FormItem>
    <FormItem label="描述" prop="contentRemark">
      <Input v-model="blogContent.contentRemark" placeholder="请输入描述" ></Input>
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
import SummerNote from '@/components/SummerNote'

export default {
  data() {
    return {
      blogContent: {
        cid: null,
        title: "",
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
        ]
      }
    };
  },
  components: {
    SummerNote
  },
  methods: {
    click () {
      this.$refs.summernote.click()
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
