<template>
  <transition name="fade">
    <div class="modal" v-show="showMdal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{ title }}</span>
          <a href="javascript:;" class="close" @click="$emit('cancel')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" :class="btnType" @click="$emit('sure')">{{
            sureText
          }}</a>
          <a href="javascript:;" :class="btnType" @click="$emit('cancel')">{{
            cancelText
          }}</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  components: {},
  props: {
    //弹框类型
    modalType: {
      type: String,
      default: "form",
    },
    //弹框标题
    title: {
      type: String,
      default: "对话框",
    },
    //按钮类型
    btnType: {
      type: String,
      default: "btn",
    },
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showMdal: {
      type: Boolean,
      default: false,
    },
  },

  data() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
}
.modal {
  display: flex;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000004f;
    z-index: 999;
  }
  .modal-dialog {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-top: -200px;
    margin-left: -220px;
    background-color: #fff;
    padding: 0 20px;
    width: 420px;
    height: 300px;
    z-index: 9999;
    .modal-header {
      padding: 10px 0;
      border-bottom: 1px solid;
      position: relative;
      .close {
        position: absolute;
        right: 0;
      }
    }
    .modal-body {
      height: 180px;
      text-align: center;
      padding-top: 10px;
      color: #00000085;
    }

    .modal-footer {
      text-align: center;
    }
  }
}

.fade-enter {
  transition: 0.5s;
  opacity: 0;
  .modal-dialog {
    top: 0;
    transition: 0.5s;
  }
}

.fade-enter-active {
  transition: 0.5s;
  opacity: 0;
  .modal-dialog {
    top: 0;
    transition: 0.5s;
  }
}

.fade-enter-to {
  transition: 0.5s;
  opacity: 1;
  .modal-dialog {
    top: 40%;
    transition: 0.5s;
  }
}

.fade-leave {
  transition: 0.5s;
  opacity: 1;
  .modal-dialog {
    top: 40%;
    transition: 0.5s;
  }
}

.fade-leave-active {
  transition: 0.5s;
  opacity: 0;
  .modal-dialog {
    top: 0;
    transition: 0.5s;
  }
}

.fade-leave-to {
  transition: 0.5s;
  opacity: 0;
  .modal-dialog {
    top: 0;
    transition: 0.5s;
  }
}
</style>