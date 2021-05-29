<template>
  <section class="index-banner">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      loop
      autoplay
     :pagination="{clickable: true }"
    >
      <swiper-slide>
        <div class="banner-content">
          <div class="row">
            <div class="col-md-6">
              <img src="../assets/img/index-banner1.png" alt="" />
            </div>
            <div class="col-md-6">
              <div class="con-r">
                <p>Advertisement</p>
                <h1>COMFORTABILITY</h1>
                <button class="btn-swiper">SHOW MORE</button>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
//这里导入对应样式
import 'swiper/components/pagination/pagination.scss'
//导入后在SwiperCore.use([])里注册
SwiperCore.use([Pagination, Autoplay])
export default {
  name: "footer",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
    };
  },
  setup() {
  },
  created() {},
  mounted() {},
  methods: {
    onSwiper(swiper) {},
    onSlideChange() {},
  },
};
</script>

<style scoped lang="scss">
.index-banner {
  margin-bottom: 60px;
  .swiper-container {
    background-color: #f2f3db;
    --swiper-navigation-color: #ffffff;
    --swiper-pagination-color: #ead481;
    .banner-content {
      padding: 10rem 7rem;
      .row {
        align-items: center;
      }
      img {
        max-width: 100%;
      }
      .con-r {
        border-left: chocolate 1px solid;
        padding-left: 40px;
        .btn-swiper {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>