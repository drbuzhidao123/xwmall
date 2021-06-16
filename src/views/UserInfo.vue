<template>
        <div class="userInfo">
          <p><strong>用户Id:</strong>{{ userId }}</p>
          <p><strong>用户名:</strong>{{ username }}</p>
          <p><strong>用户名:</strong>{{ realname }}</p>
          <p><strong>手机:</strong>{{ mobile }}</p>
          <p><strong>收货地址：</strong>{{ address }}</p>
        </div>
</template>

<script>
export default {
  name: "userInfo",
  components: {
  },
  data() {
    return {
      userId: window.sessionStorage.getItem("userId"),
      username: window.sessionStorage.getItem("username"),
      mobile: window.sessionStorage.getItem("mobile"),
      address:window.sessionStorage.getItem("address"),
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
  },
};
</script>

<style scoped lang="scss">
  .userInfo {
    border: 1px solid #eeeeee;
    padding: 20px;
    strong {
      display: inline-block;
      width: 100px;
    }
  }
</style>