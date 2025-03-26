<!--
 注册
 @type：page
 @依赖：
 @Arthur：
-->
<template>
  <div class="login">
    <div class="min-h-screen flex items-center justify-center w-full">
      <div class="text-gray-500 rounded-3xl md:shadow-xl md:w-[760px] w-full md:bg-white/40">
        <div class="md:flex w-full justify-center ">
          <div  class="hidden md:flex md:w-2/5 bg-indigo-500 py-10 px-10 text-white flex-col justify-center items-center ">
            <div class="h-32 w-32 rounded-lg p-2 bg-white mb-4 flex items-center">
              <img src="/static-assets/images/base/logo.png" height="237"  width="288"/>
            </div>

            <div v-if="!globalConfig.isDisguise" class="text-center">
              <strong class="text-2xl">小满vpn加速器</strong>
              <br>
              <strong class="text-2xl">新用户免费</strong>
            </div>
            
          </div>
          <div class="w-full md:w-3/5">
            <div class=" w-full py-1 px-5 md:px-10 md:py-10 ">
              
              <div class="md:hidden text-center mb-10">
                <div class="font-bold text-gray-900 flex flex-col justify-center items-center">
                  <div class="h-20 w-20 mb-1">
                    <img src="/static-assets/images/base/logo.png" height="237"  width="288"/>
                  </div>
                  <div class="md:block text-center mb-10" :class="globalConfig.isDisguise || 'hidden'">
                    <h1 class="font-bold text-3xl text-gray-900">用户注册</h1>
                  </div>
                  <div  v-if="!globalConfig.isDisguise" >
                    <strong class="text-2xl">小满vpn加速器</strong>
                    <br>
                    <strong class="text-2xl">新用户免费</strong>
                  </div>
                  
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
                             @keyup='inputValidate'
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
                        @keyup='inputValidate'
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
                             @keyup='inputValidate'
                             v-model="form.password2"
                             class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                             placeholder="请再次输入密码">
                    </div>
                  </div>
                </div>
                <div v-show='checkIsFailed' class="text-center -mx-3 text-red-600 text-sm  mb-4">
                  <i class="mdi mdi-alert-circle-outline "></i>
                  <span id="err_tip">{{failText}}</span>
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
import { Basic } from '@/api/api.js'
import { onMounted, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import {showNotify, showToast} from 'vant'
import axios from "axios"

const router = useRouter()
const globalConfig = computed(()=> window.globalConfig)
// 注册接口
const api = globalConfig.value.regApi
// 成功后的跳转地址
const jumpAfterSuccess = globalConfig.value.jumpAfterSuccess
// 邀请码
const invite_code = 'textCode'

const form = reactive({
  email: '',
  password: '',
  password2: ''
})
const method = 'POST'
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

function doSubmit() {
  const {email, password} = form
  const isValid = inputValidate({email, password, invite_code})
  if(isValid) doPost({email, password, invite_code})
}
function doPost(params) {
  //axios 提交
  // axios.post(api, params)
  //   .then(response => {
  //     const {token, is_admin, auth_data} = response.data
  //     setTimeout(function () {
  //       window.location.href = jumpAfterSuccess
  //     }, 2000)
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  $.ajax({
    url: api,
    type: method,
    data: params,
    success: function (res) {
      const { token, is_admin, auth_data } = res.data
      if (globalConfig.value.isDisguise) {
        showNotify({
          type: "success",
          message:'注册成功。'
        })
      } else {
        showNotify({
          type: "success",
          message:'注册成功，即将跳转到APP下载页'
        })
        // showToast('注册成功，即将跳转到APP下载页')
        setTimeout(function () {
          window.location.href = jumpAfterSuccess
        }, 2000)
      }
    },
    error: function (err){
      const {statusText,responseJSON:{message}} = err
      if(statusText === 'error' && message) {
        showNotify({
          type: "danger",
          message
        })
      }
    }
  })
}

const checkIsFailed = ref(false)
const failText = ref("")

function inputValidate() {
  const {email, password, password2} = form
  if (email === '') {
    failText.value = '邮箱不能为空'
    checkIsFailed.value = true
    return false
  }
  if (!emailReg.test(email)) {
    failText.value = '邮箱格式不正确'
    checkIsFailed.value = true
    return false
  }
  if (password === '') {
    failText.value = '密码不能为空'
    checkIsFailed.value = true
    return false
  }
  if (password.length < 8) {
    failText.value = '密码需大于8个字符'
    checkIsFailed.value = true
    return false
  }
  if (password2 === '') {
    failText.value = '确认密码不能为空'
    checkIsFailed.value = true
    return false
  }
  if (password !== password2) {
    failText.value = '两次密码不一致'
    checkIsFailed.value = true
    return false
  }
  else {
    checkIsFailed.value = false
    return true
  }
}
</script>

<style scoped lang="scss">
.login {
  @apply h-full flex flex-col justify-center items-center w-full ;
  .login-box {
    @apply relative bg-white/20 flex flex-col items-center justify-center w-[92%] py-4 rounded-lg max-w-[600px] border border-slate-500/25;
  }
}
</style>
