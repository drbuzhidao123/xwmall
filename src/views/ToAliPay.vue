<template>
   <loading-screen v-if="isLoading"></loading-screen>
   <div class="form" v-html="html_data"></div>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen.vue';
export default {
  name: "orderPay",
  components: {LoadingScreen},
  data() {
    return {
      order_id: this.$route.query.order_id,
      total_price:this.$route.query.total_price,
      order_body:this.$route.query.order_body,
      html_data:'',
      isLoading:true,
    };
  },
  mounted() {
      this.paySubmit();
  },
  methods: {
      paySubmit(){
          let _this = this;
          _this.axios
          .post("AliPay/pagePay", {
            order_id: _this.order_id,
            total_price: _this.total_price,
            order_body: _this.order_body,
          })
          .then(function (res) {
            if (res.data.status == 1) {
              //console.log(res.data.result);return false;
              _this.html_data = res.data.result;
              setTimeout(()=>{
                document.forms[0].submit();  
                 _this.isLoading=false;
              },300)
            } else {
                _this.$message.error({
                  message: '支付失败！',
                  showClose: true,
                  offset: 100,
                });
            }
          });
      }
  },
};
</script>

<style scoped lang="scss">
</style>