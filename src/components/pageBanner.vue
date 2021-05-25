<template>
  <section class="page-banner">
    <div class="row">
      <div class="col-md-12">
        <h3>产品</h3>
        <a href="javascript:void(0)">首页</a><span>/</span><a href="javascript:void(0)">产品</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Page-banner",
  components: {},
};
</script>

<style scoped lang="scss">
.page-banner {
  background-color: #000;
  text-align: center;
  color: #fff;
  padding-top:  60px;
  padding-bottom: 60px;
  margin-bottom: 60px;
  a{
    color: #fff;
  }
  .row{
    .col-md-12{
      h3{
        margin-bottom: 20px;
      }
      span
     {
       margin:0 20px;
     }
    }
        align-items: center;
  }
}
</style>
