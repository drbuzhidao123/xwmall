<template>
  <page-banner></page-banner>
  <section class="detail wrap3">
    <div class="product-details-area">
      <div class="row">
        <div class="col-md-6">
          <img :src="product.image" alt="" />
        </div>
        <div class="col-md-6 right">
          <h4>{{ product.title }}</h4>
          <span>{{ product.ex_title }}</span>
          <div class="summary">
            <p>{{ product.summary }}</p>
          </div>
          <p class="price">$150</p>
          <div class="btn-buy">
            <a href="javascript:void(0)">Add To Cart</a>
          </div>
        </div>
      </div>
    </div>
    <div class="product-content">
       <h2>product content</h2>
       <div class="content">
          <p v-html="product.content"></p>
       </div>
    </div>
  </section>
</template>

<script>
import pageBanner from "@/components/pageBanner.vue";
export default {
  name: "detail",
  components: {
    pageBanner,
  },
  data() {
    return {
      product: Array,
      proid: Number,
    };
  },
  mounted() {
    this.proid = this.$route.query.proid;
    this.getPro();
  },
  methods: {
    getPro() {
      let _this = this;
      _this.axios
        .post("Product/getData", { id: _this.proid })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.product = res.data.result;
          } else {
            _this.product = res.data.result;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.detail {
  .product-details-area {
    margin-bottom: 60px;
    .right {
      h4 {
        margin-bottom: 20px;
      }
      span {
        font-size: 14px;
      }
      .btn-buy {
        margin-top: 40px;
        a {
          display: inline-block;
          font-size: 14px;
          line-height: 1;
          color: #333;
          border: 1px solid #ead481;
          -webkit-transition: all 0.5s ease-in-out 0s;
          -o-transition: all 0.5s ease-in-out 0s;
          transition: all 0.5s ease-in-out 0s;
          padding: 12px 30px 12px;
          border-radius: 50px;
          z-index: 1;
        }
      }
    }
  }
  .product-content{
     h2{
         font-weight: 100;
     }
     .content{
        margin-top: 40px;
     }
  }
}
</style>