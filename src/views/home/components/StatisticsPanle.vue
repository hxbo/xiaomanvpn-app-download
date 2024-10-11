<template>
  <div class="flex flex-45p flex-wrap flex-col justify-between bg-white p-2 rounded-lg ">
    <div class="flex justify-between mb-5">
      <span class="w-8 h-8 rounded-full flex justify-center items-center text-white" :class="data.color">
        <span v-if="data.icon.startsWith('<svg')" v-html="data.icon" />
        <van-icon v-else :name="data.icon" size="24" />
      </span>
      <strong class="text-xl">{{ data.value }}</strong>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-gray-700">{{ data.title }}</span>
      <small class="text-gray-400">{{data.unit}}</small>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
</style>
