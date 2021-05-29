
<template>
  <!-- 初始状态下隐藏提示框 -->
  <div v-show="isShow">
    <div class="alert">
      <div class="flex">{{msg}}</div>
      <!-- alert插件只显示确定按钮 -->
      <div v-if="type === 'alert'">
        <div class="btnCommon success" @click="close">确定</div>
      </div>
      <!-- confirm插件显示取消和确定按钮 -->
      <div class="space-around" v-else>
        <div class="btnCommon cancel" @click="cancelEvent">取消</div>
        <div class="btnCommon success" @click="successEvent">确定</div>
      </div>
    </div>
    <!-- 背景遮罩 -->
    <div class="mask" @click="closeMask"></div>
  </div>
</template>
 
<script>
export default {
  name: 'Alert',
  props: {
    // 提示信息
    msg: {
      type: String,
      default: ''
    },
    // 是否显示提示框
    isShow: {
      type: Boolean,
      default: false
    },
    // 插件类型：alert/confirm
    type: {
      type: String,
      default: 'alert'
    },
    // confirm插件接收的确认事件
    success: {
      type: Function,
      default: () => {
        console.log('点击了success');
      }
    },
    // confirm插件接收的取消事件
    cancel: {
      type: Function,
      default: () => {
        console.log('点击了cancel');
      }
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.isShow = false
    },
    // alert 插件点击阴影区域关闭弹窗
    closeMask() {
      if(this.type === 'alert') {
        this.close();
      }
    },
    // confirm 插件点击取消触发的事件
    cancelEvent() {
      this.cancel();
      this.close();
    },
    // confirm 插件点击确定触发的事件
    successEvent() {
      this.success();
      this.close();
    }
  }
}
 
</script>
<style lang='scss' scoped>
$btnMain: #009688;
$btnDark: darken($btnMain, 5%);
 
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  left: 50%;
  margin-left: -150px;
  top: 50%;
  margin-top: -75px;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, .05);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
 
.flex {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
.space-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
 
.btnCommon {
  width: 105px;
  line-height: 32px;
  text-align: center;
  border-radius: 6px;
  &.success {
    background-color: $btnMain;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: $btnDark;
    }
  }
  &.cancel {
    background-color: #ededed;
    color: #333;
    cursor: pointer;
  }
}
 
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2000;
}
</style>