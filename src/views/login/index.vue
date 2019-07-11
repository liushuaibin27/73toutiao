<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item prop='mobile'>
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item  prop='code'>
          <el-input v-model="ruleForm.code" placeholder="请输入验证码" style="width:350px" ></el-input>
          <el-button style="float:right">点击验证</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox checked="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:450px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: url("../../assets/images/login_bg.jpg") no-repeat center/cover;
  .login-box {
    background: #fff;
    position: absolute;
    width: 500px;
    height:350px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    img {
      display: block;
      height: 30px;
      margin: 10px auto 30px;
    }
  }
}
.el-checkbox {
  margin-right: 10px;
}
</style>
