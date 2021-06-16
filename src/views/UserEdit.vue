<template>
  <div class="userEdit">
    <div class="title"><strong>个人信息修改</strong></div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="username"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          type="mobile"
          v-model="ruleForm.mobile"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          type="address"
          v-model="ruleForm.address"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空！"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: window.sessionStorage.getItem("username"),
        password: "",
        mobile: window.sessionStorage.getItem("mobile"),
        address: window.sessionStorage.getItem("address"),
        userId: window.sessionStorage.getItem("userId"),
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        mobile: [{ validator: validatePass, trigger: "blur" }],
        address: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = window.sessionStorage.getItem("token");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.axios
            .post("User/edit", {
              ruleForm: _this.ruleForm,
            })
            .then(function (res) {
              if (res.data.status == 1) {
                sessionStorage.clear();
                window.sessionStorage.setItem("token", res.data.result.token);
                window.sessionStorage.setItem("userId", res.data.result.id);
                window.sessionStorage.setItem(
                  "username",
                  res.data.result.username
                );
                window.sessionStorage.setItem(
                  "password",
                  res.data.result.password
                );
                window.sessionStorage.setItem("mobile", res.data.result.mobile);
                window.sessionStorage.setItem(
                  "address",
                  res.data.result.address
                );
                _this.$message.success({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
              } else {
                _this.$message.error({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.userEdit {
  border: 1px solid #eeeeee;
  padding: 20px;
  .title {
    margin-bottom: 40px;
  }
}
</style>