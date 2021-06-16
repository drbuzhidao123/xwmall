<template>
  <section class="orderConfirm wrap3">
    <div class="address">
      <p class="title"><strong>收件人地址：</strong></p>
      <input v-model="address" />
    </div>
    <hr />
    <div class="orderInfo">
      <p class="title"><strong>订单信息：</strong></p>
      <ul class="list">
        <li v-for="item in orderData">
          <img :src="item.image" alt="" />
          <div class="context">
            <p>{{ item.title }}</p>
            <span>规格：</span
            ><span v-for="children in item['specsValue']"
              >{{ children.name }}&nbsp&nbsp</span
            >
          </div>
          <div class="num">
            <p><span>购买数量：</span>{{ item.shopNum }}</p>
          </div>
          <div class="one_price">
            <p>
              <span>单价：</span><span class="price">{{ item.price }}</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="send_style">
        <p class="title">
          <strong>配送方式：</strong><span class="txt-right">包邮</span
          ><span class="txt-right">{{ logistics }}</span>
        </p>
      </div>
      <div class="card">
        <p class="title">
          <strong>发票：</strong><span class="txt-right">不需要</span>
        </p>
      </div>
      <div class="acount_info fr">
        <div>
          商品件数：<span>{{ count }}件</span>
        </div>
        <div>运费：<span class="price">0元</span></div>
        <div>优惠券：<span>无</span></div>
        <div>
          总价：<span class="price">{{ total_price }}元</span>
        </div>
      </div>
      <div class="clear"></div>
      <div class="submit btn fr" @click="submit()">提交订单</div>
      <div class="clear"></div>
    </div>
  </section>
  <modal
    title="订单确认"
    btnType="btn"
    modalType="middle"
    :showMdal="showMdal"
    @cancel="showMdal = false"
    @sure="commit()"
  >
    <template v-slot:body>
      <p>是否确定提交订单！</p>
    </template>
  </modal>
</template>

<script>
import Modal from "../components/Modal.vue";
export default {
  name: "orderConfirm",
  components: {
    Modal,
  },
  data() {
    return {
      orderData: JSON.parse(this.$route.query.orderData),
      user_id: window.sessionStorage.getItem("userId"),
      address: window.sessionStorage.getItem("address"),
      count: 0,
      total_price: 0,
      logistics: "申通",
      sku_ids: [],
      showMdal: false,
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
    this.getAcount();
  },
  methods: {
    getAcount() {
      let _this = this;
      this.orderData.filter(function (currentValue, index, arr) {
        _this.count = _this.count + Number(currentValue.shopNum);
        _this.total_price =
          _this.total_price + currentValue.price * currentValue.shopNum;
      });
    },

    submit() {
      this.showMdal = true;
    },

    commit() {
      let _this = this;
      if (_this.address.trim() == "" || _this.address.trim() == null) {
        _this.$message.error({
          message: "请输入地址！",
          showClose: true,
          offset: 100,
        });
      }
      this.orderData.filter(function (currentValue, index, arr) {
        _this.sku_ids.push(currentValue["skuId"]);
      });
      _this.sku_ids = String(_this.sku_ids);
      _this.axios
        .post("Order/add", {
          user_id: this.user_id,
          address: this.address,
          total_price: this.total_price,
          logistics: this.logistics,
          sku_count: this.count,
          sku_ids: this.sku_ids,
        })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.$message.success(res.data.message);
            _this.$router.push({
              path: "/orderPay",
              name: "orderPay",
              params: { order_id: res.data.result },
            });
          } else {
            _this.$message.error({
              message: res.data.message,
              showClose: true,
              offset: 100,
            });
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.orderConfirm {
  padding-top: 40px;
  padding-bottom: 40px;
  .title {
    margin-bottom: 25px;
  }
  .txt-right {
    margin-left: 30px;
    color: chocolate;
  }
  .address {
    margin-bottom: 40px;
    input {
      min-width: 500px;
      min-height: 30px;
      padding: 0 10px;
    }
  }
  .orderInfo {
    margin: 40px 0;
    .list {
      margin-bottom: 40px;
      li {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
      }
    }
    .card {
      .txt-right {
        margin-left: 63px;
      }
    }
    .acount_info {
      width: 200px;
      color: #00000085;
      div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
    }
    .submit {
      width: 200px;
      text-align: center;
      margin: 40px 0 0 0;
      cursor: pointer;
    }
    img {
      width: 30%;
    }
  }
}
</style>