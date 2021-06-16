<template>
  <section class="orderList">
    <div class="title"><strong>订单列表</strong></div>
    <loading v-if="isLoading"></loading>
    <div class="list" v-if="!isLoading">
      <ul v-for="(item, index) in orderList">
        <li><span class="left">id：</span>{{ index + 1 }}</li>
        <li><span class="left">购买人：</span>{{ username }}</li>
        <li><span class="left">订单号：</span>{{ item.order_id }}</li>
        <li>
          <span class="left">状态：</span>
          <a
            class="txt-error"
            v-if="item.status == '未支付'"
            @click="goPayPage(item.order_id)"
            >{{ item.status }}(点击跳转支付页面)</a
          >
          <span v-else>{{ item.status }}</span>
        </li>
        <li>
          <span class="left">订单金额：</span
          ><span class="price">{{ item.total_price }}</span>
        </li>
        <li>
          <span class="left">快递：</span><span>{{ item.logistics }}</span>
        </li>
        <li>
          <span class="left">订单创建时间：</span
          ><span>{{ item.created }}</span>
        </li>
      </ul>
     <div class="load-more">
      <a href="javascript:void(0)" @click="morePro()">查看更多订单</a>
      <p class="hidden">没有订单数据了</p>
    </div>
    </div>
  </section>
</template>

<script>
import Loading from "../components/Loading.vue";
export default {
  name: "OrderList",
  components: {
    Loading
  },
  data() {
    return {
      isLoading:true,
      username: window.sessionStorage.getItem("username"),
      orderList: [],
      queryInfo: {
        user_id: window.sessionStorage.getItem("userId"),
        //查询参数
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示的条数
        pagesize: 6,
      },
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
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      let _this = this;
      _this.axios
        .post("order/getOrderList", this.queryInfo)
        .then(function (res) {
          if (res.data.status == 1) {
            res.data.result.forEach((item) => {
              if (item.status == 1) {
                item.status = "未支付";
              } else if (item.status == 2) {
                item.status = "已支付";
              } else if (item.status == 3) {
                item.status = "已发货";
              } else if (item.status == 4) {
                item.status = "已收货";
              } else if (item.status == 5) {
                item.status = "已完成";
              } else {
                item.status = "状态有误";
              }
              item.created = new Date(item.created * 1000).toString(); //js的时间戳是以毫秒为单位，所以要乘1000
              _this.orderList.push(item);
              _this.isLoading = false;
            });
          } else {
            document.querySelector(".load-more a").classList.add("hidden");
            document.querySelector(".load-more p").classList.remove("hidden");
          }
        });
    },

    morePro() {
      this.queryInfo.pagenum = this.queryInfo.pagenum + 1;
      this.getOrderList();
    },

    goPayPage(order_id) {
         this.$router.push({ path: "/orderPay", name:'orderPay', params:{order_id:order_id}});
    },
  },
};
</script>

<style scoped lang="scss">
.orderList {
  a {
    cursor: pointer;
  }
  .txt-error {
    color: red;
  }
  .txt-error:hover {
    color: #ead481;
  }
  border: 1px solid #eeeeee;
  padding: 20px;
  .title {
    margin-bottom: 40px;
  }
  hr {
    background-color: #eeeeee;
    height: 1px;
    border: none;
  }
  .list {
    ul {
      border-top: #eeeeee 1px solid;
      padding-top: 30px;
      li {
        margin-bottom: 20px;
        .left {
          width: 120px;
          opacity: 0.6;
        }
      }
    }
  }
  .load-more{
    text-align: center;
    margin: 30px 0 20px 0;
  }
}
</style>