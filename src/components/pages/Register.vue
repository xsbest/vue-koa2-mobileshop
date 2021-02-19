<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack" />
    <div class="register-panel">
      <van-field
        v-model="userName"
        label="用户名"
        placeholder="请输入用户名"
        required
        clearable
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
