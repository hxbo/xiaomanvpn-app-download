<template>
 <div class="p-2">
   <div class="" @click="toggle">
     <span class="text-md text-gray-400 ml-1 mr-2">
       <van-icon name="arrow-up" class="transition-all duration-500" :class="{rotate: !props.isExpand}"  />
     </span>
     <slot name="title"></slot>
   </div>


   <div class="transition-all duration-500 grid"
        :class="[props.isExpand ? 'grid-template-rows-1fr' : 'grid-template-rows-0fr']"
   >
     <div class="overflow-hidden">
       <slot name="children" class=" overflow-hidden"></slot>
     </div>
   </div>


 </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    //是否展开
    isExpand:{
      type: Boolean,
      default: true
    }
  })
</script>

<style lang="scss" scoped>
.rotate {
  transform: rotate(180deg);
}
.grid-template-rows-1fr {
    grid-template-rows: 1fr;
}
.grid-template-rows-0fr {
    grid-template-rows: 0fr;
}
</style>
