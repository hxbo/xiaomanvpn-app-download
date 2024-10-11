<template>
  <div class="p-2 border m-1 bg-white text-sm rounded-md" @click="click">
    {{ data.code }}
  </div>
</template>

<script lang="js" setup>
import {defineProps} from 'vue'
import {showTopMessage} from '@/utils/Toast.js'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const click = async () => {
  if (!props.data) {
    showTopMessage('井无效')
  }
  const wellId = props.data.id;
  if (!wellId) {
    showTopMessage('井ID无效')
  }
  localStorage.setItem('well-id', wellId)
}

</script>

<style lang="scss" scoped></style>
