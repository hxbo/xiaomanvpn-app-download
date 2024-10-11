<template>
  <div class="flex mt--1 flex-col" style="height: 100%">
    <div class="flex justify-between items-center p-1 bg-white">
      <van-button
        icon="wap-nav"
        size="small"
        to="welllist"
        color="linear-gradient(to right, rgb(0,122,255), rgb(0,122,200))"
        style="flex: 0 0 40px"
      />
      <van-search v-model="keyWords" placeholder="请输入搜索关键词" style="flex: 1" />
    </div>
    <div class="p-3 flex-1 overflow-auto">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="flex justify-between flex-wrap gap-4">
          <StatisticsPanle v-for="item in statics" :key="item.title" :data="item" />
        </div>

        <div class="flex justify-between items-center mt-6 mb-3">
          <h3>泥浆性能总表</h3>
          <van-button icon="plus" size="small" type="primary" text="" @click="toDetails" />
        </div>
        <van-cell-group style="border-radius: 8px; overflow: hidden">
          <transition-group tag="div" class="box-wrap" name="list">
            <van-swipe-cell
              v-for="item in computeVal"
              :key="item.id"
              @touchstart="cellTouchStart"
              @touchend="(e) => cellTouchEnd(e, item)"
            >
              <van-cell is-link>
                <template #title>
                  <div class="cell-title">
                    <span class="cell-title__pre-icon">
                      <van-icon name="bars" />
                    </span>
                    <span class="cell-title__value">
                      <strong>{{ item.sampleTime }}</strong>
                    </span>
                  </div>
                </template>
              </van-cell>
              <template #right>
                <van-button square type="danger" text="删除" @click="cellHandlerDelete(item.id)" />
              </template>
            </van-swipe-cell>
          </transition-group>
        </van-cell-group>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
import StatisticsPanle from '@/views/home/components/StatisticsPanle.vue'
import { showTopMessage } from '@/utils/Toast.js'
import { Mud } from '@/api/api.js'

const keyWords = ref('')
const router = useRouter()
const data = ref([])
const computeVal = computed({
  get: () => {
    if (keyWords.value) {
      return data.value.filter((row) => {
        return row.sampleTime.includes(keyWords.value)
      })
    } else {
      return data.value
    }
  }
})
const loading = ref(false)

onMounted(() => {
  dataQuery()
})

const statics = ref([])

/**
 * 列表删除
 * @param {String} id 删除的data id
 * */
const cellHandlerDelete = (id) => {
  showConfirmDialog({
    message: '确定要删除吗？',
    theme: 'round-button',
    width: '320px',
    confirmButtonColor: '#1989fa',
    cancelButtonColor: '#c0c4cc'
  }).then(() => {
    deleteVal(id)
  })
}

/**
 * 删除数据项
 * @param  {String} id
 * */
const deleteVal = async (id) => {
  if (!id) {
    showTopMessage('无效标识')
  }
  let wellId = localStorage.getItem('well-id')
  if (!wellId) {
    showTopMessage('请选择井')
  }
  let params = { wellId: wellId, id: id }
  Mud.deleteMud(params).then((result) => {
    if (result.data) {
      showTopMessage('删除成功')
      dataQuery()
    } else {
      showTopMessage('删除失败')
    }
  })
}

const toDetails = async () => {
  let params = { code: 0 }
  await router.push({ name: 'detail', params: { data: JSON.stringify(params) } })
}

/**
 * 获取泥浆性能数据
 * @return {Promise<void>}
 */
const dataQuery = async () => {
  let wellId = localStorage.getItem('well-id')
  if (!wellId) {
    showTopMessage('请选择井')
  }
  let params = {
    keyword: 'mud',
    wellId: wellId
  }
  await Mud.dataQuery(params).then((result) => {
    data.value = result.data
  })
  let density = 0.0
  let funnelViscosity = 0.0
  let day = 0
  if (data.value.length > 0) {
    const value = data.value.reduce((max, current) => {
      return new Date(current.sampleTime) > new Date(max.sampleTime) ? current : max
    })
    density = value.density
    funnelViscosity = value.funnelViscosity
    if (value.createDate) {
      const difference = new Date() - new Date(value.createDate)
      day = Math.floor(difference / (1000 * 60 * 60 * 24))
    }
  }
  statics.value = [
    {
      title: '数据总数',
      value: data.value.length,
      unit: '',
      icon: 'newspaper-o',
      color: 'bg-blue-700'
    },
    { title: '最新数据', value: day, unit: '天前', icon: 'notes-o', color: 'bg-pink-400' },
    {
      title: '泥浆密度',
      value: density.toFixed(2),
      unit: 'g/cm3',
      icon: '<svg t="1721975674883" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19024" width="24" height="24"><path d="M1013.44039 528c-0.2-0.3-0.3-0.6-0.4-0.9L892.84039 196.9c-1-2.6 1-5.4 3.8-5.4H973.34039c2.2 0 4-1.8 4-4 0-16.6-6.7-31.5-17.6-42.4-10.9-10.9-25.9-17.6-42.4-17.6H560.34039c-8.8 0-16-7.2-16-16V64.1c0-17.5-13.8-32.2-31.3-32.6-9.1-0.2-17.4 3.4-23.4 9.4-5.8 5.8-9.4 13.8-9.4 22.6v48c0 8.8-7.2 16-16 16H108.34039c-33.1 0-60 26.9-60 60 0 1.1 0.5 2.1 1.2 2.8 0.7 0.7 1.7 1.2 2.8 1.2h73.8c2.8 0 4.7 2.8 3.8 5.4L9.64039 527.1c-0.3 0.8-0.6 1.6-1 2.4C-3.75961 555-3.05961 584.9 12.34039 608.7c12 18.5 27.2 35 45 48.9 36.9 28.7 84.7 46 137 46 81.4 0 152-41.9 187.2-103.4 12.9-22.5 11.3-49.8-2-72.1-0.2-0.3-0.3-0.6-0.4-0.9L258.84039 196.9c-1-2.6 1-5.4 3.8-5.4H384.34039c53 0 96 43 96 96v583.6c0 23.6-17.2 43.8-40.5 47.4-63.4 9.8-115.2 30.9-143.6 58h448.3c-30.6-29.1-88-51.2-157.9-60-24.1-3-42.2-23.4-42.2-47.6V287.5c0-53 43-96 96-96h120.5c2.8 0 4.7 2.8 3.8 5.4L644.34039 527.1c-0.2 0.5-0.4 1-0.7 1.5-13.3 24.4-13.8 53.6 0.8 77.2 36.2 58.4 105 97.8 183.9 97.8 81.3 0 151.8-41.8 187-103.1 13.1-22.7 11.4-50.2-1.9-72.5z m-696.6 15.5h-245l118.8-326.4c1.3-3.5 6.2-3.5 7.5 0l118.7 326.4z m389.7 0l118.4-325.4c1.3-3.5 6.2-3.5 7.5 0l118.4 325.4H706.54039z" p-id="19025" fill="white"></path></svg>',
      color: 'bg-yellow-900'
    },
    {
      title: '漏斗粘度',
      value: funnelViscosity.toFixed(2),
      unit: 's',
      icon: 'filter-o',
      color: 'bg-indigo-400'
    }
  ]
}

/**
 * 列表刷新
 * */
const onRefresh = () => {
  setTimeout(() => {
    loading.value = false
    dataQuery()
  }, 1000)
}

// 判断cell的点击（区分滑动事件）
const startpx = ref([0, 0])
const moveAmount = ref([0, 0])
// 单元格点击事件
const cellHandleClick = (item) => {
  if (!item) {
    return
  }
  const newItem = {
    ...item,
    code: 1
  }
  router.push({ name: 'detail', params: { data: JSON.stringify(newItem) } })
}
// 判断cell的滑动事件
const cellTouchStart = (e) => {
  const { clientX, pageX, clientY, pageY } = e.changedTouches[0]
  startpx.value[0] = pageX || clientX
  startpx.value[1] = pageY || clientY
}
const cellTouchEnd = (e, item) => {
  const { target } = e
  if (target.className.indexOf('van-button') !== -1) return
  const { clientX, pageX, clientY, pageY } = e.changedTouches[0]
  const endXpx = pageX || clientX
  const endYpx = pageY || clientY
  moveAmount.value[0] = endXpx - startpx.value[0]
  moveAmount.value[1] = endYpx - startpx.value[1]
  // 横向与纵向移动距离都小于10px， 则判定为点击事件
  const isClick = Math.abs(moveAmount.value[0]) < 10 && Math.abs(moveAmount.value[1]) < 10
  if (isClick) {
    cellHandleClick(item)
  }
}
</script>

<style lang="scss" scoped>
.cell-title {
  display: flex;
  align-items: center;

  &__pre-icon {
    width: 24px;
    height: 24px;
    background-color: #1a7bdc;
    border-radius: 50%;
    margin-right: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-enter-from {
  transform: translateX(30px);
}

.list-leave-to {
  transform-origin: 0 50%;
  transform: scale(0.5, 0.5);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s linear;
}
</style>
