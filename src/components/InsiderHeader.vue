<template>
  <div class="insiderHeader clearfix">
    <div class="wrap3">
      <div class="fl">
        <img src="../assets/img/logo.png" />
        <span>{{title}}</span>
      </div>
      <div class="fr">
        <a href="/">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsiderHeader",
  components: {},
  props: {
    title: {
      type: String,
      default: "欢迎光临",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.insiderHeader {
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
</style>