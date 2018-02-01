<template>
  <content-form ref="form"  @onSave="onSave" @onCancel="onCancel">
  </content-form>
</template>

<script>
import ContentForm from "./Form";
import Api from "@/api/Content";
import * as R from "@/router/router-types";

export default {
  mounted() {
    this.$indicator.open();
    Api.findById(this.$route.params.cid)
      .then(resp => {
        if (resp.success) {
          console.log(resp.rows)
          this.$refs.form.initData(resp.rows);
        } else {
          this.$Message.error(`获取信息失败${resp.message || ""}`);
          // this.$router.go(-1)
        }
        this.$indicator.close();
      })
      .catch(err => {
        this.$Message.error(`获取信息失败:${err}`);
        this.$indicator.close();
        //  this.$router.go(-1)
      });
  },

  methods: {
    onSave(item) {
      this.$indicator.open();
      Api.update(item)
        .then(resp => {
          if (resp.success) {
            this.$Notice.success({ title: "操作成功", content: "编辑成功" });
            this.$router.go(-1);
          } else {
            this.$Message.error(`编辑失败${resp.message || ""}`);
          }
          this.$indicator.close();
        })
        .catch(err => {
          this.$Message.error(`编辑失败${err.message || ""}`);
          this.$indicator.close();
        });
    },
    onCancel() {
      this.$router.go(-1);
    }
  },

  components: {
    ContentForm
  }
};
</script>
