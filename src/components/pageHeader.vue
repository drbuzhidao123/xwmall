<template>
  <header class="header">
    <div class="wrap">
      <div class="header-inner">
        <div class="row">
          <div class="col-md-2">
            <div class="logo">
              <img
                src="../assets/img/logo.png"
                class="animate__animated animate__bounceInLeft"
                alt=""
              />
            </div>
          </div>
          <div class="col-md-7">
            <div class="menu">
              <ul>
                <li class="animate__animated animate__backInDown">
                  <a href="/"><p>首页</p></a>
                </li>
                <li class="animate__animated animate__backInDown">
                  <router-link to="/product">产品</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-3">
            <a class="search" href="javascript:;">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
              </svg>
            </a>
            <router-link to="/cart">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shop"></use>
              </svg>
            </router-link>
             <router-link to="/user">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghu"></use>
              </svg>
         </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "header",
  components: {},
  data() {
    return {
      //proCateList: Array,
    };
  },
  mounted() {
    this.fixedHeader();
    //this.getProCate();
  },
  methods: {
    fixedHeader() {
      window.onscroll = function () {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= document.querySelector(".header").offsetHeight) {
          document.querySelector(".header").classList.add("sticky-header");
        } else {
          document.querySelector(".header").classList.remove("sticky-header");
        }
      };
    },
    /*getProCate() {
      let _this = this;
      this.axios.post("ProductCate/getAll").then(function (res) {
        if (res.data.status == 1) {
          _this.proCateList = res.data.result;
        } else {
        }
      });
    },*/
  },
};
</script>

<style scoped lang="scss">
.header {
  .header-inner {
    padding-top: 25px;
    padding-bottom: 25px;
    align-items: center;
    .row {
      align-items: center;
      .col-md-7 {
        .menu {
          text-align: center;
          ul {
            li {
              display: inline-block;
              padding: 0 40px;
              a {
                font-size: 16px;
              }
            }
          }
        }
      }
      .col-md-3 {
        text-align: right;
        a {
          padding-left: 40px;
        }
      }
    }
  }
}
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  margin: 0;
  background-color: #ffffff;
  -webkit-animation: fadeInDown 0.8s ease-in-out;
  -moz-animation: fadeInDown 0.8s ease-in-out;
  -ms-animation: fadeInDown 0.8s ease-in-out;
  -o-animation: fadeInDown 0.8s ease-in-out;
  animation: fadeInDown 0.8s ease-in-out;
  -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 14%);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 3px rgb(0 0 0 / 14%);
}
</style>