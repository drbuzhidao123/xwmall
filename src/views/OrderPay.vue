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
              订单提交成功！ 赶紧去付款吧~
              <svg class="icon smile-icon" aria-hidden="true">
                <use xlink:href="#icon-smile"></use>
              </svg>
            </h3>
            <div class="explain">
              <p>收货人： {{ username }} {{ mobile }}</p>
              <p>收货地址：{{ order.address }}</p>
              <p>订单创建时间：{{ order.created }}</p>
            </div>
            <div class="orderInfo">
              <p><span>订单号：</span>{{ order_id }}</p>
              <p>
                <span>收货信息：</span> {{ username }}&nbsp;&nbsp;&nbsp;{{
                  mobile
                }}&nbsp;&nbsp;&nbsp;{{ order.address }}
              </p>
              <div class="shopInfo">
                <p><span>商品信息</span></p>
                <el-table :data="order['order_goods']" style="width: 100%">
                  <el-table-column prop="title" label="商品名称">
                  </el-table-column>
                  <el-table-column prop="specs" label="规格"> </el-table-column>
                  <el-table-column prop="price" label="单价"> </el-table-column>
                  <el-table-column prop="num" label="数量"> </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="pay">
          <p>
            应付金额：<span class="price">{{ order.total_price }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="pay_title">请选择以下方式进行付款</div>
    <hr />
    <div class="row pay_type">
      <a
        class="btn_pay"
        :class="{ checked: pay_type == 2 }"
        @click="pay_type = 2"
        href="javascript:void(0)"
      >
        <img src="../assets/img/alipay.png" />
      </a>
    </div>
    <div class="row go_pay">
      <a href="javascript:void(0)" class="btn go_pay_btn" @click="goPay()">
        去支付
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: "orderPay",
  components: {},
  data() {
    return {
      order_id: this.$route.params.order_id,
      user_id: window.sessionStorage.getItem("userId"),
      username: window.sessionStorage.getItem("username"),
      mobile: window.sessionStorage.getItem("mobile"),
      order: [],
      pay_type: "",
      order_name: window.sessionStorage.getItem("username") + "购买商品",
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

    goPay() {
      let _this = this;
      if (this.pay_type == 0 || this.pay_type == null || this.pay_type == "") {
        this.$message.error("请选择支付方式！");
        return false;
      }
      if (this.pay_type == 2) {
        let routeData = this.$router.resolve({
          name: "ToAliPay",
          query: {order_id:this.order_id,total_price:this.order.total_price,order_body: this.order_name+"支付订单"}
        });
        window.open(routeData.href, "_blank");//在vue路由中打开新窗口跳转
        //window.open('http://www.xwsysapi.com/index/AliPay/pagePay?order_id='+this.order_id+'&total_price='+this.order.total_price+'&order_body='+this.order_name, '_blank');
        /*_this.axios
          .post("AliPay/pagePay", {
            order_id: _this.order_id,
            total_price: _this.order.total_price,
            order_body: _this.order_name+"支付订单",
          })
          .then(function (res) {
            if (res.data.status == 1) {
              _this.isLoading==false;
              //console.log(res.data.result);return false;
              //window.location.href=res.data.result;
              //document.forms[0].submit();
            } else {
              _this.$message.error("支付失败！");
            }
          });*/
      } else if (this.pay_type == 1) {
          _this.$message.error({
                  message:'微信支付功能待开发！',
                  showClose: true,
                  offset: 100,
                });
      } else {
         _this.$message.error({
                  message:'请选择规定的支付方式！',
                  showClose: true,
                  offset: 100,
                });
      }
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