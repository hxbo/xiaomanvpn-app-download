<!--
 系统总登录页
 @type：page
 @依赖：
 @Arthur：何晓波
-->
<template>
  <div class="login">
    <div class="title-box">
      <div class="text-xl">用户登录</div>
    </div>

    <div class="login-box shadow-lg">
      <van-form @submit="onSubmit" style="width: 90%">
        <div class="field-row">
          <SvgComponent size="24px" type="username" />
          <van-field
            v-model="loginForm.account"
            name="用户名"
            label=""
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
        </div>

        <div class="field-row">
          <SvgComponent size="24px" type="password" />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </div>
        <div class="field-row">
          <SvgComponent size="24px" type="validCode" />
          <van-field
            v-model="loginForm.captcha"
            type="text"
            name="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
          <img
            alt="点击刷新"
            title="点击刷新"
            style="
              vertical-align: middle;
              height: 30px;
              position: relative;
              right: 0;
              top: 0.6rem;
              cursor: pointer;
            "
          />
        </div>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script setup>
import SvgComponent from '@/components/base/SvgComponent.vue'
import { Basic } from '@/api/api.js'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onSubmit() {
  console.log('onSubmit');
  
}

/**
 * 登录部分
 * */
const loginForm = reactive({
  account: '',
  password: '',
  captcha: '',
  captchaFlag: '',
  publicKeyFlag: '',
  clientSource: 1
})

onMounted(() => {
  
})
</script>

<style scoped lang="scss">
.visible-toggle {
  transition: 0.5s;
  opacity: 0;
  margin-top: -60px;
  z-index: 0 !important;

  &.visible-toggle-show {
    opacity: 1;
    margin-top: 0;
  }
}

.refreshCode {
  cursor: pointer;
  font-size: 20px;
  vertical-align: middle;
}

.graphic-code {
  vertical-align: middle;
  margin: 0 0.5rem;
}

.login {
  @apply h-full flex flex-col justify-center items-center bg-cover bg-no-repeat bg-left-bottom;

  background-image: url('../../../public/static-assets/images/login/login-page-bg-gradient.jpg');

  .el-col {
    z-index: 1;
    position: relative;
    background-color: #ffffff;
    text-align: center;
  }

  .login-box {
    @apply relative bg-white/20 flex flex-col items-center justify-center w-[92%] py-4 rounded-lg max-w-[600px] border border-slate-500/25;

    .field-row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 1rem;
    }
    .van-cell {
      background-color: transparent;
    }

    i .icon {
      width: 24px;
      height: 24px;
      left: -6px;
      top: 6px;
      position: relative;
    }
  }

  .title-box {
    text-align: center;
    padding-bottom: 1rem;
    margin-top: 2rem;
    .logo {
      text-align: center;
      margin-bottom: 2rem;
      img {
        width: 80px;
        height: auto;
      }
    }
    .title {
      font-size: 2rem;
      margin: 0;
      font-weight: normal;
      line-height: 1.6em;
    }
  }

  .el-input__icon {
    line-height: 44px;
    font-size: 18px;
  }
}

.form-input {
  position: relative;
}

.login {
  ::v-deep .el-form-item {
    .el-input__inner {
      border: none;
    }

    input.el-input__inner {
      height: 42px;
      line-height: 42px;
      border-bottom: 2px solid #e9e9e9;
      border-radius: 0;
      padding-left: 36px;
      position: relative;
      outline: none;
    }
  }
}

.form-input:after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  left: 0;
  transition: width 0.5s;
  background-image: linear-gradient(90deg, #2053fe, #d7d8fe);
}

.form-input:hover:after {
  width: 100%;
}

.form-input > input:focus:after {
  background-color: blue;
}
</style>
