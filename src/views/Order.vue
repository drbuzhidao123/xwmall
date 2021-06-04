<template>
  <insider-header :title="pageTitle"></insider-header>
     <router-view></router-view>
    <page-footer></page-footer>
</template>

<script>
import InsiderHeader from "@/components/InsiderHeader.vue";
import pageFooter from '../components/pageFooter.vue';
export default {
  name: "Order",
  components: {
    InsiderHeader,
    pageFooter,
  },
  mounted(){
    let path = this.$route.path;
    if(path=='/orderConfirm'){
      this.pageTitle = '订单确认';
    }else if(path=="/orderPay"){
      this.pageTitle = '支付页面';
    }else{
       this.pageTitle = '订单列表'
    }
  },
  data(){
      return{
           pageTitle:'订单列表'
      }
  }
};
</script>
