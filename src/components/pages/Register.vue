<template>
  <div class="register">
    <van-nav-bar title="用户注册"
                 left-text="返回"
                 left-arrow
                 @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="userName"
                 label="用户名"
                 placeholder="请输入用户名"
                 required
                 clearable />
      <van-field v-model="password"
                 label="密码"
                 type="password"
                 placeholder="请输入密码"
                 required
                 clearable />
      <div class="register-button">
        <van-button type="primary"
                    size="large">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: "",
      password: ''
    };
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.register-button {
  padding-top: 10px;
}
</style>
