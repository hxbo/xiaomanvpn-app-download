<template>
  <router-view v-slot="{ Component, route }" class="bg-cover bg-no-repeat bg-right-bottom bg-[url('/static-assets/images/base/background-mobile.jpg')]  lg:bg-[url('/static-assets/images/base/background-desktop.jpg')] ">
    <!-- 使用任何自定义过渡和回退到 `fade` -->
    <transition :name="transitionName">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watchEffect, watch } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

const router = useRouter()
const route = useRoute()
const transitionName = ref()

let startX = 0

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX
}

const handleTouchEnd = (event) => {
  const endX = event.changedTouches[0].clientX
  const distance = endX - startX
  // 如果滑动距离大于 100px，且是从左往右滑动，认为是返回上一页
  if (distance > 100) {
    const isWelllist = route.path === '/welllist'
    if (isWelllist) return
    transitionName.value = 'slide-right' // 设置切换动画为右滑
    router.back() // 返回上一页
    setTimeout(() => (transitionName.value = ''), 500)
  }
}

onMounted(() => {
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)
})

onBeforeUnmount(() => {
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})

const curRoute = ref({})
// 监听路由变化，动态调整动画方向
// watch(route, (to) => {
//   if (curRoute.value.meta) {
//     if (to.meta.index > curRoute.value.meta.index) {
//       transitionName.value = 'slide-left' // 前进
//     } else {
//       transitionName.value = 'slide-right' // 返回
//     }
//   }
//   curRoute.value = deepClone(to)
// })
function deepClone(obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepClone(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
</script>

<style>
/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 左右滑动效果 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}
.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100%);
}
.slide-left-leave-to,
.slide-left-enter {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to,
.slide-right-enter {
  transform: translateX(100%);
  opacity: 0;
}
</style>
