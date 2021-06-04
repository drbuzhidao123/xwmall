<template>
  <page-banner pathTitle1="首页" path1="#/" pathTitle2="产品" path2="#/product"></page-banner>
  <section class="shop wrap3">
    <div class="row">
      <div class="col-md-3">
        <div class="categroy">
          <div class="shop-search">
            <h2 class="title">Search</h2>
            <div class="from">
              <form class="search-form" action="#">
                <input type="text" placeholder="Search here..." />
                <button class="submit">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <h2>Shop Categories</h2>
          <ul class="list">
            <li v-for="item in cateList">
              <a href="javascript:void(0)" @click="toggleCategroy(item.id)">
                {{ item.title }}
                <i class="fr">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                  </svg>
                </i>
              </a>
              <ul>
                <li v-for="children in item.children" @click="toggleCategroy(children.id)">
                  <a href="javascript:void(0)">
                    {{ children.title }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="prolist">
          <ul class="row">
            <li
              class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
              v-for="item in proList"
            >
              <div class="img">
                <img :src="item.image" @click="goDetail(item.id)"/>
              </div>
              <div class="des">
                <h4>{{ item.title }}</h4>
                <p>{{ item.summary }}</p>
                <p class="price">$150</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="load-more">
      <a href="javascript:void(0)" @click="morePro()">Find More</a>
      <p class="hidden">没有数据了</p>
    </div>
  </section>
</template>

<script>
import pageBanner from "@/components/pageBanner.vue";
export default {
  name: "Product",
  components: {
    pageBanner,
  },
  data() {
    return {
      cateList: Array,
      proList: Array,
      listOption: {
        cate_id: "all",
        //当前页码
        pagenum: 1,
        //每页显示的条数
        pagesize: 6,
      },
    };
  },
  mounted() {
    this.getCategroy();
    this.getProList();
  },
  methods: {
    getCategroy() {
      let _this = this;
      this.axios.post("ProductCate/getAll").then(function (res) {
        if (res.data.status == 1) {
          _this.cateList = res.data.result;
        } else {
        }
      });
    },
    toggleCategroy(cate_id) {
      this.listOption.cate_id = cate_id;
      this.getProList();
    },
    getProList() {
      let _this = this;
      _this.listOption.pagenum = 1;
      this.axios.post("Product/getList", this.listOption).then(function (res) {
        if (res.data.status == 1) {
          _this.proList = res.data.result;
        } else {
          _this.proList = res.data.result;
        }
      });
    },
    morePro() {
      let _this = this;
      _this.listOption.pagenum = _this.listOption.pagenum + 1;
      this.axios.post("Product/getList", this.listOption).then(function (res) {
        if (res.data.status == 1) {
          res.data.result.forEach((item) => {
            _this.proList.push(item);
          });
        } else {
          document.querySelector(".load-more a").classList.add("hidden");
          document.querySelector(".load-more p").classList.remove("hidden");
        }
      });
    },
    goDetail(id){
       this.$router.push({path:'/detail',query:{proid:id}});
    }
  },
};
</script>

<style scoped lang="scss">
.shop {
  .categroy {
    border: 1px solid #eeeeee;
    padding: 17px 18px 29px;
    .shop-search {
      padding-bottom: 40px;
      border-bottom: #eeeeee solid 1px;
      .search-form {
        position: relative;
      }
      input {
        background: transparent none repeat scroll 0 0;
        border: 1px solid #e6e6e6;
        font-size: 14px;
        height: 43px;
        padding: 2px 55px 2px 18px;
        color: #444;
        width: 100%;
      }
      button {
        background: transparent none repeat scroll 0 0;
        border-color: #a1a5aa;
        -webkit-border-image: none;
        -o-border-image: none;
        border-image: none;
        border-style: none none none solid;
        border-width: medium medium medium 1px;
        padding: 1px 15px 0;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #000;
        -webkit-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;
        transition: all 0.3s ease 0s;
        font-size: 17px;
      }
    }
    h2 {
      font-size: 18px;
      padding-bottom: 20px;
      padding-top: 20px;
    }
    ul {
      li {
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
  .prolist {
    .img {
      overflow: hidden;
      img {
        width: 100%;
        max-height: 277px;
        transition: all ease-in-out 0.5s;
        cursor: pointer;
      }
      img:hover {
        transform: scale(1.1, 1.1);
        opacity: 0.7;
      }
    }
  }
  .load-more {
    text-align: center;
    margin: 40px;
    a {
      border: 1px solid #000;
      padding: 5px 40px;
    }
  }
}
</style>