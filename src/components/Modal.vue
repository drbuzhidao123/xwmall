<template>
  <div class="modal" v-show="showMdal">
      <div class="mask"></div>
    <div class="modal-dialog">
      <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="close">
                 <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
          </a>
      </div>
      <div class="modal-body">
          <slot name="body"></slot>
      </div>
      <div class="modal-footer">
          <a href="javascript:;" :class="btnType">{{sureText}}</a>
          <a href="javascript:;" :class="btnType">{{cancelText}}</a>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  components: {},
  props:{
      //弹框类型
      modalType:{
          type:String,
          default:'form',
      },
      //弹框标题
      title:{
            type:String,
            default:'对话框',
      },
      //按钮类型
      btnType:{
          type:String,
          default:'btn',
      },
      sureText:{
          type:String,
          default:'确定',
      },
      cancelText:{
        type:String,
        default:'取消',  
      },
      showMdal:{
        type:Boolean,
        default:0,  
      },
  },

};
</script>

<style scoped lang="scss">
    .icon{
        width: 1.0em;
        height: 1.0em;
    }
    .modal{
        display: flex;
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #0000004f;
            z-index: 999;
        }
        .modal-dialog{
            position: fixed;
            top: 50%;
            left: 50%;
            margin-top: -200px;
            margin-left: -220px;
            background-color:#fff;
            padding: 0 20px;
            width: 440px;
            height: 320px;
            z-index: 9999;
            .modal-header{
                padding: 10px 0;
                border-bottom: 1px solid;
                position: relative;
                .close{
                    position: absolute;
                    right: 0;
                }
            }
            .modal-body{
                height: 200px;
                text-align: center;
                padding-top: 10px;
            }

            .modal-footer{
                text-align: center;
            }
        }
    }
</style>