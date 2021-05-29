<template>
  <footer>
    <div class="top wrap2">
      <div class="social col-md-8">
        <div class="row">
          <div class="col-md-4">
            <div class="title">
              <p>Follow us</p>
              <p class="big">THE XWMALL</p>
            </div>
          </div>
          <ul class="col-md-8">
            <li>
              <a id="WeChat" href="javascript:void(0)"
                ><img src="http://stysofa.com/images/home/wechat_icon.png"
              /></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tel col-md-4 text-right">
        <div class="title">
          <span>全国客服热线</span> <span class="big"> 0757-23396635</span>
        </div>
      </div>
    </div>
    <div class="bottom wrap2">
      <div class="copyright">
        © 2021 XWMALL
        <a href="javascript:void(0)" target="_blank"
          >POWER BY XWMALL</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer",
  components: {},
};
</script>

<style scoped lang="scss">
footer {
  .top {
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    min-height: 175px;
    .social {
      .row {
        align-items: center;
        .title {
          .big {
            font-weight: 500;
            font-size: 24px;
          }
        }
        #WeChat {
          img {
            max-width: 40px;
          }
        }
        .qrcode {
          display: none;
        }
      }
    }
  }
  .bottom{
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  footer{
    .wrap2{
      padding-left: 0;
      padding-right: 0;
    }
  }
}

</style>