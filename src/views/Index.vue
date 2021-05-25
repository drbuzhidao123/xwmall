<template>
  <section class="index">
    <banner></banner>
    <section class="s1 text-center wrap3">
      <h2>Top Sales Product</h2>
      <div class="index-product-list">
        <ul class="row">
          <li class="col-md-4" v-for="item in recommendList">
            <img :src="item.image" />
            <p>{{ item.title }}</p>
            <p class="price">$150</p>
          </li>
        </ul>
      </div>
    </section>
    <section class="s2 wrap">
      <img src="../assets/img/index-back1.jpg" alt="" />
    </section>
    <section class="s3 text-center wrap3">
      <h2>News List</h2>
      <div class="index-news">
        <ul class="row">
          <li class="col-md-4">
            <div class="img">
              <img src="../assets/img/news1.jpg" alt="" />
            </div>
            <p>新闻</p>
            <a href="#">LEARN MORE</a>
          </li>
          <li class="col-md-4">
            <div class="img">
              <img src="../assets/img/news1.jpg" alt="" />
            </div>
            <p>新闻</p>
            <a href="#">LEARN MORE</a>
          </li>
          <li class="col-md-4">
            <div class="img">
              <img src="../assets/img/news1.jpg" alt="" />
            </div>
            <p>新闻</p>
            <a href="#">LEARN MORE</a>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import Banner from "../components/Banner.vue";
export default {
  name: "index",
  components: {
    Banner,
  },
  data() {
    return {
      recommendList: Array,
    };
  },
  mounted() {
    this.getRecommend();
  },
  methods: {
    getRecommend() {
      let _this = this;
      this.axios
        .post("Product/getRecommend", { cate_id: "all", limit: 3 })
        .then(function (res) {
          if (res.data.status == 1) {
            _this.recommendList = res.data.result;
          } else {
            alert(res.data.message);
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.index {
  .s1 {
    margin-bottom: 60px;
    .index-product-list{
      img{
        cursor: pointer;
      }
    }
    img {
      width: 100%;
    }
    h2 {
      margin-bottom: 60px;
    }
  }
  .s2 {
    margin-bottom: 60px;
    img {
      width: 100%;
      margin: 0 auto;
    }
  }
  .s3 {
    margin-bottom: 60px;
    img {
      width: 100%;
    }
    h2 {
      margin-bottom: 60px;
    }
    .index-news {
      .row {
        .col-md-4 {
          .img {
            overflow: hidden;
            cursor: pointer;
          }
        }
        img {
          transition: all ease-in-out 0.4s;
        }
        img:hover {
          transform: scale(1.1, 1.1);
        }
        a {
          font-weight: 600;
        }
      }
    }
  }
}
</style>