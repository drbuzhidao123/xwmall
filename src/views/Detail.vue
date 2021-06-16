<template>
  <page-banner
    pathTitle1="首页"
    path1="#/"
    pathTitle2="产品"
    path2="#/product"
  ></page-banner>
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
          <div class="sku">
            <ul class="spces">
              <li v-for="(item, index) in specs">
                <span class="specsName text-left">{{ item.name }}</span>
                <a
                  class="btn spcesValue"
                  v-for="(value, key) in item.list"
                  :class="{ checked: selectOption[index] == value.id }"
                  @click="select(index, value.id)"
                  href="javascript:void(0)"
                  >{{ value["name"] }}</a
                >
              </li>
            </ul>
          </div>
          <div class="min-height70">
            <span class="text-left">价格（元）</span>
            <span class="price text-right"> {{ sku.price }}</span>
          </div>
          <div class="min-height70">
            <span class="text-left">库存</span>
            <span class="stock text-right">{{ sku.stock }}</span>
          </div>
          <div class="number">
            <el-input-number
              v-model="shopNum"
              @change="handleChange"
              :min="1"
              :max="sku.stock"
              label="购买数量"
            ></el-input-number>
          </div>
          <div class="btn-buy">
            <a href="javascript:void(0)" @click="addCart()">Add To Cart</a>
          </div>
        </div>
      </div>
    </div>
    <div class="product-content">
      <h2>Product Detail</h2>
      <div class="content">
        <p v-html="product.content"></p>
      </div>
    </div>
  </section>
    <modal title="提示" sureText="查看购物车" btnType="btn" modalType="middle" :showMdal="showMdal" @cancel="showMdal=false" @sure="goCart()">
    <template v-slot:body>
      <p>商品添加成功，点击右上角图标可以查看购物车信息！</p>
    </template>
  </modal>
</template>

<script>
import Modal from "../components/Modal.vue";
import pageBanner from "@/components/pageBanner.vue";
export default {
  name: "detail",
  components: {
    pageBanner,
    Modal,
  },
  data() {
    return {
      product: Array,
      proid: Number,
      specs: Array,
      selectOption: {},
      sku: Array,
      userId: window.sessionStorage.getItem("userId"),
      shopNum: 1,
      showMdal:false,
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
    this.proid = this.$route.query.proid;
    this.getPro();
    this.getSpecs();
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
             _this.$message.error({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
          }
        });
    },
    getSpecs() {
      let _this = this;
      _this.axios
        .post("Specs/getSpecs", { id: _this.proid })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.specs = res.data.result;
          } else {
             _this.$message.error({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
          }
        });
    },
    select(index, valueId) {
      let _this = this;
      this.selectOption[index] = valueId;
      let selectArr = this.transStr(this.selectOption);
      let specsArr = Object.keys(this.specs);
      let selectParam = selectArr.join();
      if (selectArr.length >= specsArr.length) {
        _this.axios
          .post("sku/getSkuData", { selectParam: selectParam, proId:_this.proid})
          .then(function (res) {
            if (res.data.status == 1) {
              _this.sku = res.data.result;
            } else {
               _this.$message.error({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
            }
          });
      }
    },
    addCart() {
      let _this = this;
      let selectArr = this.transStr(this.selectOption);
      let specsArr = this.transStr(this.specs);
      if (this.sku.stock <= 0) {
         _this.$message.error({
                  message: "没有库存了",
                  showClose: true,
                  offset: 100,
                });
        return false;
      }
      if (selectArr.length < specsArr.length) {
         _this.$message.error({
                  message: "请选择规",
                  showClose: true,
                  offset: 100,
                });
        return false;
      }
      this.axios.post("Cart/add", {
          userId: this.userId,
          skuId: this.sku.id,
          shopNum: this.shopNum,
        }).then(function (res) {
          if (res.data.status == 1) {
            _this.showMdal=true;
          } else {
              _this.$message.error({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
          }
        });
    },
    goCart(){
      this.$router.push({ path: "/cart" });
    },
    //对象转数组
    transStr(obj) {
      var arr = [];
      for (var item in obj) {
        arr.push(obj[item]);
      }
      return arr;
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
      .text-left {
        font-size: 16px;
        font-weight: 600;
      }
      .text-right {
        margin-left: 40px;
      }
      .stock {
        margin-left: 90px;
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
      .sku {
        .spces {
          padding-left: 0;
          overflow: hidden;
          .checked {
            background-color: #fff;
            color: #000;
            border: 1px solid #000;
          }
          li {
            margin: 20px 0;
            min-height: 50px;
            .spcesValue {
              margin: 0 20px;
              min-width: 130px;
              display: inline-block;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .product-content {
    h2 {
      font-weight: 100;
    }
    .content {
      margin-top: 40px;
    }
  }
}
</style>