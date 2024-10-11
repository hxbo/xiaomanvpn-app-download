<template>
  <div class=" h-full flex flex-col justify-center items-center p-4 ">
    <div class="logo">
        <img src="/static-assets/images/base/logo.png" alt="" class="w-[5rem]" />
    </div>
    <div class=" min-w-80 w-1/2">
      <div class="flex gap-6 mt-6">
        <van-button icon="user" block size="normal" type="primary" text="注册" @click.native="router.push({ name: 'login'})"/>
        <van-button icon="down" block size="normal" type="success" text="下载" />
      </div>
      <div class="mt-6 *:text-wrap">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem beatae commodi veritatis minus? Dolor harum sapiente aspernatur mollitia quibusdam labore!</p>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const router = useRouter()
</script>

<style lang="scss" scoped>

</style>
