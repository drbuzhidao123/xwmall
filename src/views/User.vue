<template>
  <page-banner
    pathTitle1="首页"
    path1="#/"
    pathTitle2="用户中心"
    path2="#/user"
  ></page-banner>
  <section class="user wrap3">
    <div class="row">
      <div class="col-md-3">
        <div class="categroy">
          <h2>个人中心</h2>
          <ul class="list">
            <li>
               <router-link to="/userInfo">
                个人信息
                <i class="fr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                  </svg>
                </i>
             </router-link>
              <ul>
                <li class="children">
                  <router-link to="/userEdit">信息修改</router-link>
                </li>
              </ul>
            </li>
             <li>
               <a href="javascript:void(0)">
                订单管理
                <i class="fr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                  </svg>
                </i>
             </a>
              <ul>
                <li class="children">
                  <router-link to="/orderList">订单列表</router-link>
                </li>
              </ul>
            </li>
            <li class="close">
              <a @click="logout()" href="javascript:void(0)">退出</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
         <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
import pageBanner from "@/components/pageBanner.vue";
export default {
  name: "user",
  components: {
    pageBanner,
  },
  data() {
    return {
      userId: window.sessionStorage.getItem("userId"),
      username: window.sessionStorage.getItem("username"),
      mobile: window.sessionStorage.getItem("mobile"),
      address:window.sessionStorage.getItem("address"),
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
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  min-height: 400px;
  .col-md-9{
    margin-bottom: 20px;
  }
  .categroy {
    border: 1px solid #eeeeee;
    padding: 17px 18px 29px;
    h2 {
      font-size: 18px;
      padding-bottom: 20px;
      padding-top: 20px;
    }
    ul {
      li {
        .children{
          margin-top: 10px;
        }
        padding-bottom: 15px;
        i {
          cursor: pointer;
          .icon {
            font-size: 0.6rem;
          }
        }
      }
    }
  }
}
</style>