<template>
  <div class=" h-full flex flex-col justify-center items-center p-4 md:flex-row md:items-center md:gap-10">
    <div class="">
      <img src="/static-assets/images/2-1-384x779.png" class="w-[220px] md:w-[280px]" />
    </div>
    <div class="">
      <h2 class="hidden md:block text-3xl max-w-[460px] mb-8 font-bold leading-10">访问海外网络服务，很便宜，速度很快，下载APP很方便，有事找在线客服</h2>
      <p class="my-4 text-center md:text-left">请下载对应的客户端:</p>
      <div class=" grid grid-cols-2 gap-4">

        <a href="#" @click="openRandomLink()" target="_blank" class="button bg-slate-800 ">
          <i class="mdi mdi-apple "></i>
          苹果手机下载
        </a>
        <a href="https://xm.dingge58.com/xm41.com.apk" target="_blank" class="button bg-green-600">
          <i class="mdi mdi-android "></i>
          安卓手机下载
        </a>
        <a href="https://xm.dingge58.com/xm41.com.exe"  target="_blank" class="button bg-blue-500 ">
          <i class="mdi mdi-windows "></i>
          Windows电脑下载
        </a>
        <a href="https://xm.dingge58.com/xm41.com.dmg" target="_blank" class="button bg-slate-800 ">
          <i class="mdi mdi-android "></i>
          mac电脑下载
        </a>
      </div>
    </div>

  </div>

</template>

<script setup>
function openRandomLink() {
  const links = [
    'https://testflight.apple.com/join/awgxBJPy',
    'https://testflight.apple.com/join/HKdeXWcF'
  ];

  // 使用当前时间作为随机数生成的一部分
  const seed = Date.now();
  const randomIndex = Math.floor((Math.random() + seed) % 1 * links.length);
  const randomLink = links[randomIndex];
  console.log(`选中的索引: ${randomIndex}, 总链接数: ${links.length}`);
  window.open(randomLink, '_blank');
}
</script>

<style lang="scss" scoped>
.button {
  @apply rounded-full px-4 py-2 text-white w-full min-w-[140px] text-center ;
  .mid {
    @apply text-2xl
  }
  &:hover {
    @apply opacity-80
  }
}
</style>
