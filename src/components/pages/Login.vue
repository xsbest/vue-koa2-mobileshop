<template>
  <div class="register">
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="login-panel">
      <van-field
        v-model="userName"
        label="用户名"
        placeholder="请输入用户名"
        required
        clearable
        :error-message="userNameErrorMsg"
      />
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
        clearable
        :error-message="passworErrorMsg"
      />
      <div class="login-button">
        <van-button
          type="primary"
          @click="loginAction"
          size="large"
          :loading="openLoading"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      password: "",
      openLoading: false, //是否开启用户注册的loading状态
      userNameErrorMsg: "", //用户名出错提示
      passworErrorMsg: "" //密码出错提示
    };
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登录过了");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.axiosLogin();
    },
    axiosLogin() {
      this.openLoading = true;
      this.axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.msg) {
            new Promise(res => {
              localStorage.userInfo = {
                userName: this.userName
              };
              setTimeout(() => {
                res();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败,请检查账号密码是否正确");
            this.openLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    //表单验证方法
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.userNameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.userNameErrorMsg = "";
      }
      if (this.password.length < 6) {
        isOk = false;
        this.passworErrorMsg = "密码不能小于6位";
      } else {
        this.userNameErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.login-button {
  padding-top: 10px;
}
</style>
