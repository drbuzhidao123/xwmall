<template>
  <section class="page-banner">
    <div class="row">
      <div class="col-md-12">
        <h3>{{title}}</h3>
        <a :href="path1">{{pathTitle1}}</a><span>/</span><a :href="path2">{{pathTitle2}}</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Page-banner",
  components: {},
  props:{
      pathTitle1:{
          type:String,
          default:'路径标题',
      },
       pathTitle2:{
          type:String,
          default:'路径标题',
      },
       path1:{
         type:String,
         default:'/',
      },
      path2:{
         type:String,
         default:'/',
      }
  }
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
