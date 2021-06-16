<template>
  <insider-header></insider-header>
  <div class="login">
    <div class="login_content clearfix wrap3">
      <div class="img fl">
        <img src="../assets/img/index-banner1.png" alt="" />
      </div>
      <div class="login_box fr">
        <p class="top">用户登录</p>
        <input
          type="text"
          name="username"
          placeholder="用户名"
          id="username"
          v-model="username"
        />
        <input
          type="password"
          placeholder="登录密码"
          id="password"
          name="password"
          maxlength="16"
          v-model="password"
        />
        <button class="submit_btn" @click="login()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import InsiderHeader from "../components/InsiderHeader.vue";
export default {
  name: "login",
  components: {
    InsiderHeader,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    var _this = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13 || key == 100) {
        _this.login();
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      let _this = this;
      if (this.username == null || this.username == "") {
        this.$message.error({
          message: "用户名不能为空",
          type: "error",
          showClose: true,
          offset: 100,
        });
        return false;
      }

      if (this.password == null || this.password == "") {
        this.$message.error({
          message: "密码不能为空",
          type: "error",
          showClose: true,
          offset: 100,
        });
        return false;
      }
      /*登录*/
      _this.axios
        .post("login/check", {
          username: _this.username,
          password: _this.password,
        })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.$message.success({
              message: res.data.message,
              type: "success",
              showClose: true,
              offset:100
            });
            window.sessionStorage.setItem("token", res.data.result.token);
            window.sessionStorage.setItem("userId", res.data.result.id);
            window.sessionStorage.setItem("username", res.data.result.username);
            window.sessionStorage.setItem("password", res.data.result.password);
            window.sessionStorage.setItem("mobile", res.data.result.mobile);
            window.sessionStorage.setItem("address", res.data.result.address);
            _this.$router.push({ path: "/user" });
          } else {
            _this.$message.error({
              message:res.data.message,
              showClose: true,
              offset:100
            });
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  .login_content {
    margin-top: 9rem;
    .login_box {
      .top {
        text-align: center;
        font-size: 16px;
      }
      width: 349px;
      height: 388px;
      border: 1px solid #ccc;
      border-radius: 4px;
      input {
        width: 298px;
        height: 46px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        margin-left: 20px;
        padding-left: 10px;
        line-height: 46px;
        margin-top: 20px;
        font-size: 14px;
      }
      .submit_btn {
        margin: 20px;
      }
    }
  }
}
</style>