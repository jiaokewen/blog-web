<template>
  <div  v-on:keyup.enter="handleSubmit()" class="login fit-parent">
    <Card style="width:350px;height: 310px;margin-left:60%;margin-top:10%">
    <p slot="title">
    <Icon type="log-in"></Icon>
      欢迎登录
    </p>
    <Form class="login__form" ref="formInline" :model="loginForm" :rules="ruleInline">
      <FormItem>
        <h3 class="login__title">博客后台管理系统</h3>
      </FormItem>
      <FormItem prop="username">
        <Input type="text" v-model="loginForm.username" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <div class="login__error">{{loginForm.errMsg}}</div>
      <FormItem>
        <Button long type="primary" :loading="loading" @click="handleSubmit()">
          <span v-if="!loading">登录</span>
          <span v-else>登录中...</span>
        </Button>
      </FormItem>
    </Form>
    </Card>
  </div>
</template>

<script>
import userApi from '@/api/User'
import UserService from '@/service/UserService'

export default {
  mounted () {
    if (UserService.hasUserSession()) {
      this.$router.replace({ path: '/' })
    }
  },
  data () {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        errMsg: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs.formInline.validate((valid) => {
        if (!valid) {
          return
        }

        this.loading = true
        userApi.login(this.loginForm.username.trim(), this.loginForm.password.trim()).then((resp) => {
          this.loading = false
          console.log(resp)
          if (resp.success) {
            UserService.localLogin(resp.rows)
            this.$Notice.success({ title: '登录成功' })
            this.$router.replace({ path: '/' })
          } else {
            this.loginForm.errMsg = resp.message
            this.$Message.error('登录失败!')
          }
        }).catch(err => {
          this.loading = false
          this.loginForm.errMsg = err
          this.$Message.error('登录失败!')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  background-image: url(../assets/imgs/backg02.jpg);
  text-align: center;

  &__title {
    color: black;
    font-size: 30px;
  }
  &__error {
    text-align: left;
    color: red;
    margin-bottom: 5px;
  }
}
</style>
