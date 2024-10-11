<template>
  <div class="copyright-box" :class="{ relative: isRelative }">
    Copyright©2017-2024 <a href="https://www.aidrilling.com" target="_blank">蓝海智信</a> All
    Rights Reserved.
  </div>
</template>

<script>
export default {
  name: 'Copyright',
  data() {
    return {
      isRelative: false
    }
  },
  mounted() {
    this.getCopyrightPosition()
    window.addEventListener('resize', this.getCopyrightPosition)
  },
  methods: {
    //计算copyright位置
    getCopyrightPosition() {
      let winH = document.body.clientHeight
      let docH = document.body.scrollHeight
      this.isRelative = docH > winH
    }
  }
}
</script>

<style scoped lang="scss">
.copyright-box {
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100%;
  font-size: 14px;
  left: 0;

  &.relative {
    position: relative;
    padding: 20px;
    bottom: auto;
    left: auto;
  }

  a {
    color: #1387a2;
  }
}
</style>
