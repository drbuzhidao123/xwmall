<template>
    <page-header></page-header>
     <router-view></router-view>
    <page-footer></page-footer>
</template>

<script>
import pageHeader from "@/components/pageHeader.vue";
import pageFooter from '../components/pageFooter.vue';
export default {
  name: "Home",
  components: {
    pageHeader,
    pageFooter,
  },
};
</script>
