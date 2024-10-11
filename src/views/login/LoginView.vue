<!--
 系统总登录页
 @type：page
 @依赖：
 @Arthur：何晓波
-->
<template>
  <div class="login">
    <div class="title-box">
      <div class="logo">
        <img src="/static-assets/images/login/logo.png" alt="" />
      </div>
      <div class="title"></div>
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
            :src="captchaBase64" 
            style="
              vertical-align: middle;
              height: 30px;
              position: relative;
              right: 0;
              top: 0.6rem;
              cursor: pointer;
            "
            @click="getCaptcha"
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

/**
 * 验证码部分
 * */
let captchaBase64 = ref('')
let publicKey = ref('')
function getCaptcha() {
  Auth.getCaptcha().then((res) => {
    captchaBase64.value = res.data.captcha
    publicKey.value = res.data.publicKey
    loginForm.captchaFlag = res.data.captchaFlag
    loginForm.publicKeyFlag = res.data.publicKeyFlag
  })
}
onMounted(() => {
  getCaptcha()
})

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
function getIsLogined() {
  const token = localStorage.getItem('access_token')
  return !!token
}
function onSubmit() {
  loginAction()
}
async function loginAction() {
  const form = Object.assign({}, loginForm)
  Auth.login(form)
    .then((res) => {
      const { success, data } = res
      if (success) {
        localStorage.setItem('access_token', data.accessToken)
        Auth.getInfo().then((res) => {
          localStorage.setItem('user_info', JSON.stringify(res.data))
          router.push({ name: 'welllist', params: {} })
        })
      }
    })
    .catch((errorMsg) => {
      if (errorMsg !== '') {
        getCaptcha()
      }
    })
    .finally(() => {})
}
onMounted(() => {
  // 判断是否登录，登录则跳转到首页
  const isLogined = getIsLogined()
  if (isLogined) {
    router.push({ name: 'welllist' })
  } else {
    getCaptcha()
  }
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
  background: url('../../../public/static-assets/images/login/login-page-bg-gradient.jpg');
  min-height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  -webkit-background-size: cover;
  background-size: cover;

  .el-col {
    z-index: 1;
    position: relative;
    background-color: #fff;
    text-align: center;
  }

  .login-box {
    position: relative;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 94vw;
    max-width: 480px;
    height: auto;
    padding: 1rem 0;
    border-radius: 0.5rem;
    //@include boxShadow('big');
    //box-shadow: 3px 3px 24px rgba(56, 73, 119, 0.16);

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
