<template>
  <div class=" h-full flex flex-col justify-center items-center p-4 ">
    <div class="logo">
        <img src="/static-assets/images/base/logo.png" alt="" class="w-[8rem]" />
    </div>
    <div class=" min-w-80 w-1/2">
      <div class="flex gap-6 mt-6">
        <van-button icon="user" block size="normal" type="primary" text="免费注册" @click.native="router.push({ name: 'register'})"/>
        <van-button icon="down" block size="normal" type="success" text="APP下载" @click.native='goAppDown'/>
      </div>
      <div class="mt-6 *:text-wrap">
        <p>没什么介绍的，访问海外网络服务，很便宜，速度很快，下载app很方便，有事找在线客服</p>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const router = useRouter()
const jumpAfterSuccess = 'https://xm337.life/#appdown'
const goAppDown = ()=> {
  window.location.href = jumpAfterSuccess
}
</script>

<style lang="scss" scoped>

</style>
