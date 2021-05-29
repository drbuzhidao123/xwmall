<template>
  <div class="login">
    <div class="login_header clearfix">
      <div class="wrap3">
        <div class="fl">
          <img src="../assets/img/logo.png" />
          <span>欢迎光临</span>
        </div>
        <div class="fr">
          <a href="/">返回首页</a>
        </div>
      </div>
    </div>
    <div class="login_content clearfix wrap3">
      <div class="img fl">
        <img src="../assets/img/index-banner1.png" alt="">
      </div>
      <form action="/login">
        <div class="login_box fr">
          <p class="top">用户登录</p>
          <input
            type="text"
            name="username"
            placeholder="用户名"
            id="username"
            :value="username"
          />
          <input
            type="password"
            placeholder="登录密码"
            id="password"
            name="password"
            maxlength="16"
            :value="password"
          />
          <button class="submit_btn" @click="login()">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {
  },
  data() {
    return {
      username:'',
      password:''
    };
  },
  mounted() {
    
  },
  methods: {
    login(){
      if(this.username==''||this.username==null){
            alert('用户名不能为空');
            return true;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.login {
  .login_header {
    background-color: #fafafa;
    padding: 30px 0;
    .fl {
      display: flex;
      align-items: center;
      img {
        margin-right: 20px;
      }
      span {
        color: #ababab;
        padding-left: 20px;
        border-left: 1px solid #545454a1;
      }
    }
    a {
      color: #ababab;
    }
    a:hover {
      color: #ead481;
    }
  }
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
      .submit_btn{
        margin: 20px;
      }
    }
  }
}
</style>