<!--
 系统总登录页
 @type：page
 @依赖：
 @Arthur：何晓波
-->
<template>
  <div class="login">
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-gray-500 rounded-3xl md:shadow-xl w-full ">
        <div class="md:flex w-full">
          <div class="hidden md:flex w-1/2 bg-indigo-500 py-10 px-10 text-white flex-col justify-center items-center ">
            <div class="h-32 w-32 rounded-lg p-2 bg-white mb-4 flex items-center">
              <img src="/static-assets/images/base/logo.png" height="237"  width="288"/>
            </div>
            <strong class="text-2xl">小满vpn加速器</strong>
            <strong class="text-2xl">新用户免费</strong>
          </div>
          <div class="w-full md:w-1/2">
            <div class="box w-full py-1 px-5 md:px-10 md:py-10">
              <div class="hidden md:block text-center mb-10">
                <h1 class="font-bold text-3xl text-gray-900">用户注册</h1>
              </div>
              <div class="md:hidden text-center mb-10">
                <div class="font-bold text-gray-900 flex flex-col justify-center items-center">
                  <div class="h-20 w-20 mb-1">
                    <img src="/static-assets/images/base/logo.png" height="237"  width="288"/>
                  </div>
                  <strong class="text-2xl">小满vpn加速器</strong>
                  <strong class="text-2xl">新用户免费</strong>
                </div>
              </div>
              <div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-2">
                    <label class="text-xs font-semibold px-1">邮箱</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input type="email"
                             id="email"
                             v-model="form.email"
                             class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                             placeholder="请输入邮箱">
                    </div>
                  </div>
                </div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-2">
                    <label class="text-xs font-semibold px-1">密码</label>
                    <div class="flex">
                      <div
                        class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        id="password"
                        type="password"
                        v-model="form.password"
                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="请输入密码，大于8位">
                    </div>
                  </div>
                </div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-4">
                    <label class="text-xs font-semibold px-1">确认密码</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input type="password"
                             id="password2"
                             v-model="form.password2"
                             class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                             placeholder="请再次输入密码">
                    </div>
                  </div>
                </div>
                <div id="errBox" class="text-center -mx-3 text-red-600 text-sm hidden mb-4">
                  <i class="mdi mdi-alert-circle-outline "></i>
                  <span id="err_tip"></span>
                </div>
                <div class="flex -mx-3">
                  <div class="w-full px-3 mb-5">
                    <button type="submit"
                            id="submit"
                            @click="doSubmit"
                            class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">立即注册</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgComponent from '@/components/base/SvgComponent.vue'
import { Basic } from '@/api/api.js'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const api = 'https://xm337.com/api/v1/passport/auth/register'
// 成功后的跳转地址
const jumpAfterSuccess = 'download.html'
// 邀请码
const invite_code = 'textCode'

const form = reactive({
  email: '',
  password: '',
  password2: ''
})

const method = 'POST'
const $submit = $('#submit')
const $errBox = $('#errBox')
const $errText = $('#err_tip')
const $email = $('#email')
const $password = $('#password')
const $password2 = $('#password2')
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
function doSubmit() {
  const email = $email.val()
  const password = $password.val()
  inputValidate({email, password, invite_code})
  doPost({email, password, invite_code})
}
function doPost(params) {
  $.ajax({
    url: api,
    type: method,
    data: params,
    success: function (res) {
      const {token, is_admin, auth_data} = res.data
      setTimeout(function () {
        window.location.href = jumpAfterSuccess
      }, 2000)
    },
    error: function (err){
    }
  })
}
function inputValidate() {
  const email = $email.val()
  const password = $password.val()
  const password2 = $password2.val()

  if (email === '') {
    $errText.text('邮箱不能为空')
    $errBox.removeClass('hidden')
    return false
  }
  if (!emailReg.test(email)) {
    $errText.text('邮箱格式不正确')
    $errBox.removeClass('hidden')
    return false
  }
  if (password === '') {
    $errText.text('密码不能为空')
    $errBox.removeClass('hidden')
    return false
  }
  if (password.length < 8) {
    $errText.text('密码需大于8个字符')
    $errBox.removeClass('hidden')
    return false
  }
  if (password2 === '') {
    $errText.text('确认密码不能为空')
    $errBox.removeClass('hidden')
    return false
  }
  if (password !== password2) {
    $errText.text('两次密码不一致')
    $errBox.removeClass('hidden')
    return false
  }
  else {
    $errBox.addClass('hidden')
  }
}
const inputs = [$email, $password, $password2]
for (const i in inputs) {
  const item = inputs[i]
  item.on('keyup',inputValidate)
}

</script>

<style scoped lang="scss">


.login {
  @apply h-full flex flex-col justify-center items-center;

  .login-box {
    @apply relative bg-white/20 flex flex-col items-center justify-center w-[92%] py-4 rounded-lg max-w-[600px] border border-slate-500/25;
  }

}


.box {
  backdrop-filter: blur(10px);
  background-color: rgba(255,255,255,0.4);
  min-width: 460px;
}
@media (max-width: 768px) {
  .box {
    min-width: 360px;
    background-color: rgba(255,255,255,0)
  }
}

</style>
