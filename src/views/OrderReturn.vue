<template>
  <section class="orderPay wrap3">
    <div class="row orderInfo">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-2">
            <svg class="icon success-icon" aria-hidden="true">
              <use xlink:href="#icon-chenggong"></use>
            </svg>
          </div>
          <div class="col-md-10">
            <h3>
              订单支付成功啦！敬请等待收货！
              <svg class="icon smile-icon" aria-hidden="true">
                <use xlink:href="#icon-smile"></use>
              </svg>
            </h3>
            <div class="explain">
              <p>收货人： {{ username }} {{ mobile }}</p>
              <p>收货地址：{{ order.address }}</p>
              <p>订单创建时间：{{order.created}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <loading-screen v-if="isLoading"></loading-screen>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen.vue';
export default {
  name: "orderPay",
  components: {LoadingScreen},
  data() {
    return {
      order_id: this.$route.params.order_id,
      user_id: window.sessionStorage.getItem("userId"),
      username: window.sessionStorage.getItem("username"),
      mobile: window.sessionStorage.getItem("mobile"),
      order: [],
      pay_type: "",
      order_name: window.sessionStorage.getItem("username") + "购买商品",
      isLoading:false,
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
    this.getOrder();
  },
  methods: {
    getOrder() {
      let _this = this;
      _this.axios
        .post("Order/getOrder", {
          user_id: _this.user_id,
          order_id: _this.order_id,
        })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.order = res.data.result;
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
.orderInfo {
  padding: 60px 0 40px 0;
  .success-icon {
    font-size: 2.5rem;
  }
  .smile-icon {
    font-size: 0.9rem;
  }
  .explain {
    p {
      color: #00000091;
      font-size: 14px;
    }
  }
  .orderInfo {
    margin-top: 40px;
    line-height: 30px;
    span {
      width: 120px;
      display: inline-block;
    }
  }
}

.pay_title {
  font-size: 26px;
  font-weight: 100;
  color: #00000091;
  margin-bottom: 40px;
}

.pay_type {
  margin: 50px auto;
  .btn_pay {
    border: #0000002e solid 1px;
    padding: 15px 35px;
    max-width: 250px;
  }
  .btn_pay:hover {
    border: #d2b856 solid 1px;
    transition: all 0.4s ease-in-out;
  }
}

.go_pay {
  flex-direction: row-reverse;
  margin-bottom: 40px;
  .go_pay_btn {
    padding: 13px 70px;
  }
}

.checked {
  border: #d2b856 solid 1px !important;
}
</style>