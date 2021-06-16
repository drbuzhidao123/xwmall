<template>
  <insider-header :title="pageTitle"></insider-header>
  <section class="cart">
    <div class="cartList wrap3">
      <el-table
        ref="multipleTable"
        :data="cartData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-style="{ height: '150px' }"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column label="商品名称" width="200">
          <template #default="scope">
            <strong>{{ scope.row.title }}</strong>
            <span v-for="item in scope.row.specsValue"
              >({{ item["name"] }})</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价(元)" width="150">
          <template #default="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shopNum" label="数量">
          <template #default="scope">
            <span>{{ scope.row.shopNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="acount" label="小计">
          <template #default="scope">
            <span>{{ scope.row.acount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.skuId,scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="sum">
        合计：<span>{{ total }}</span
        >元
        <button class="btn" @click="order()">结算购物车</button>
      </div>
    </div>
  </section>
  <page-footer></page-footer>
</template>

<script>
import InsiderHeader from "../components/InsiderHeader.vue";
import PageFooter from "../components/pageFooter.vue";
export default {
  name: "cart",
  components: {
    InsiderHeader,
    PageFooter,
  },
  inject: ["reload"],
    setup(){
    },
  data() {
    return {
      pageTitle:window.sessionStorage.getItem("username") + "!欢迎查看您的购物车",
      cartData: [],
      sums: Array,
      total: 0,
      multipleSelection: [],
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
    this.getSku();
  },
  methods: {
    getSku() {
      let _this = this;
      _this.axios
        .post("Cart/getCartList", {
          userId: window.sessionStorage.getItem("userId"),
        })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.cartData = res.data.result;
            _this.cartData = _this.transArr(_this.cartData);
            _this.toggleAllSelection();//默认全选
          } else {
              _this.$message.error({
                  message: '没有数据',
                  showClose: true,
                  offset: 100,
                });
          }
        });
    },

    handleDelete(skuId,index) {
      let _this = this;
      this.$confirm("删除该条商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.axios
            .post("Cart/delete", {
              userId: window.sessionStorage.getItem("userId"),
              skuId: skuId,
            })
            .then(function (res) {
              if (res.data.status == 1) {
                _this.$message.success({
                  message: res.data.message,
                  type: "success",
                  showClose: true,
                  offset: 100,
                });
                 _this.cartData.splice(index, 1);
                //_this.reload();
                //_this.$router.go(0);
              } else {
                  _this.$message.error({
                  message: res.data.message,
                  showClose: true,
                  offset: 100,
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "N/A";
        }
      });
      this.sums = sums;
      return sums;
    },

    toggleAllSelection() {
      this.$refs.multipleTable.toggleAllSelection();
    },

    handleSelectionChange(val) {
      this.total = 0;
      this.multipleSelection = val;
      for (var i = 0; i < val.length; i++) {
        let oneprice = parseFloat(val[i]["price"]);
        let price = oneprice * val[i]["shopNum"];
        this.total = this.total + price;
      }
    },

    //下单
    order() {
      if (this.total <= 0) {
           this.$message.error({
                  message: '请选择要下单的商品',
                  showClose: true,
                  offset: 100,
                });
        return false;
      }

      this.$router.push({ path: "/orderConfirm" , query: {orderData: JSON.stringify(this.multipleSelection)}});
    },

    transArr(obj) {
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
.cart {
  padding: 60px 0;
  background-color: #f2f2f2a6;
  table {
    strong {
      font-size: 16px;
    }
    span {
      font-size: 16px;
    }
  }
  ul {
    overflow: hidden;
    margin: 0;
  }
  .sum {
    color: chocolate;
    text-align: right;
    margin: 60px 0 40px 0;
    span {
      color: chocolate;
      font-size: 30px;
    }
    button {
      border: #fff solid 1px;
      margin-left: 40px;
    }
  }
}
</style>