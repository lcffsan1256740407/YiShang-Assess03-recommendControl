<template>
  <div>
    <div class="top">
      <img
        src="https://ali-imgs.acfun.cn/kos/nlav10360/static/login/widget/login/img/logo.5719ca4a8e1651e46b4b.png"
      />
    </div>
    <div class="loginpage">
      <!-- 登录板块 -->
      <div class="login">
        <div class="login-header">
          <img
            src="https://ali-imgs.acfun.cn/kos/nlav10360/static/login/widget/login/img/logo.5719ca4a8e1651e46b4b.png"
          />
          账号登录
        </div>

        <div class="login-content">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="UserName">
              <el-input
                v-model="ruleForm.UserName"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>

            <el-form-item prop="PassWord">
              <el-input
                v-model="ruleForm.PassWord"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <div class="login-footer">
          <span>帮助手册</span>
          <span>忘记密码</span>
          <span>点击注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      ruleForm: {
        UserName: "",
        PassWord: "",
      },
      rules: {
        UserName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        PassWord: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            // 跳出弹框并路由至 HomePage 页面
            this.open1()
            this.$router.replace({
                name:'home'
            })
        }
      });
    },
    // 定义一个弹窗
    open1() {
        this.$notify({
          title: '登录',
          message: '用户登录成功!',
          type: 'success'
        });
    },
  }
}
</script>

<style scoped>
.top {
  display: flex;
  align-items: center;
  padding: 15px;
  padding-left: 30px;
}
.top img {
  width: 100px;
}
.loginpage {
  height: 650px;
  background-image: url("https://static.yximgs.com/udata/pkg/acfun/loginbg.be7a2d2876ab48ed.png");
  background-position-y: -130px;
  background-position-x: -160px;
  overflow: hidden;
}
.login {
  border-radius: 5px;
  width: 420px;
  height: 400px;
  box-sizing: border-box;
  padding: 13px;
  margin-top: 100px;
  margin-left: 800px;
  background: rgb(255, 255, 255, 0.9);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.login-header {
  padding: 10px;

  display: flex;
  align-items: flex-end;
}
.login-content {
  padding-top: 50px;
  flex-grow: 3;
}
.demo-ruleForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 输入框 */
.login-content >>> .el-input__inner {
  margin-left: -100px;
  width: 300px;
}
.login-content >>> .el-form-item__error {
  margin-left: -100px;
  width: 300px;
}
/* 按钮 */
.el-button {
  width: 300px;
  margin-top: 10px;
  margin-left: -100px;
}
.login-footer {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  color: rgb(61, 61, 61);

  position: relative;
}
.login-footer span {
  cursor: pointer;
  margin: 5px;
}
.login-footer span:nth-child(1) {
  position: absolute;
  left: 10px;
  color: rgb(184, 179, 179);
}
.login-footer span:hover {
  color: rgb(245, 108, 108);
}
</style>