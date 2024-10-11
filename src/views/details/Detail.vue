<template>
  <div class="flex flex-col h-full">
    <van-form @failed="onFailed" @submit="submit">
      <div class="flex h-12 justify-between items-center p-2 bg-white fixed w-full z-10">
        <van-icon name="arrow-left" @click="router.back()" />
        <van-button
          icon="success"
          text="保存"
          plain
          type="primary"
          size="small"
          native-type="submit"
        />
      </div>
      <div class="flex-1 p-2 overflow-y-scroll pt-12">
        <van-back-top />
        <h3 class="ml-4 mb-2 mt-3">必填项</h3>
        <van-cell-group inset>
          <van-field
            v-for="field in fieldList.required"
            :key="field.key"
            v-model="form[field.key]"
            v-bind="field"
            :placeholder="`请输入${field.label}`"
            :rules="field.rules || [{ required: true, message: `${field.label}不能为空` }]"
            @click="field.fn"
            autocomplete="off"
            label-class="label-class"
          />
        </van-cell-group>

        <van-popup v-model:show="showDatePicker" position="bottom">
          <van-date-picker @confirm="onConfirmDate" @cancel="showDatePicker = false" />
        </van-popup>
        <van-popup v-model:show="showTimePicker" position="bottom">
          <van-time-picker @confirm="onConfirmTime" @cancel="showTimePicker = false" />
        </van-popup>
        <van-popup v-model:show="showLbPicker" position="bottom">
          <van-picker :columns="columns" @confirm="onLbConfirm" @cancel="showLbPicker = false" />
        </van-popup>

        <h3 class="ml-4 mb-2 mt-6">计算项</h3>
        <van-cell-group inset>
          <van-field
            v-for="field in fieldList.computed"
            :key="field.key"
            v-model="computedFields[field.key]"
            v-bind="field"
            readonly
            placeholder="自动计算"
          >
            <template #label>
              <span>{{ field.label }}</span>
            </template>
            <template v-if="field.key === 'gradientModel'">
              <p>{{ selectedModelText }}</p>
            </template>
          </van-field>
        </van-cell-group>

        <h3 class="ml-4 mb-2 mt-6">非必填项</h3>
        <van-cell-group inset>
          <van-field
            v-for="field in fieldList.notRequired"
            :key="field.key"
            v-model="form[field.key]"
            v-bind="field"
            :placeholder="`请输入${field.label}`"
          />
        </van-cell-group>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Mud } from '@/api/api.js'
import { showTopMessage } from '@/utils/Toast.js'
import { showNotify } from 'vant'

const props = defineProps(['data'])
const code = ref(0)

onMounted(() => {
  const data = JSON.parse(props.data)
  if (!data) {
    return
  }
  code.value = data.code
  form.id = data.id
  if (data.sampleTime) {
    const [date, time] = data.sampleTime.split(' ')
    form.date = date
    form.time = time
  }
  form.sampleDepth = data.sampleDepth
  form.sampleTemperature = data.sampleTemperature
  form.liquid = data.liquid
  form.density = data.density
  form.funnelViscosity = data.funnelViscosity
  form.gradientModel = data.gradientModel
  form.r600 = data.r600
  form.r300 = data.r300
  form.r200 = data.r200
  form.r100 = data.r100
  form.r6 = data.r6
  form.r3 = data.r3
  form.bgzd = data.bgzd
  form.sxzd = data.sxzd
  form.dql = data.dql
  form.dsb = data.dsb
  form.s10 = data.s10
  form.min10 = data.min10
  form.sandContent = data.sandContent
  form.alkalinity = data.alkalinity
  form.phValue = data.phValue
  form.frictionResistance = data.frictionResistance
  form.bentoniteContent = data.bentoniteContent
  form.filtrationLoss = data.filtrationLoss
  form.thickMudCake = data.thickMudCake
  form.oilContent = data.oilContent
  form.waterContent = data.waterContent
  form.oilWaterRatio = data.oilWaterRatio
  form.solidContent = data.solidContent
  form.ionCi = data.ionCi
  form.ionCa = data.ionCa
  form.contentPm = data.contentPm
  form.contentPfMf = data.contentPfMf
  form.salinity = data.salinity
  form.ca = data.ca
  form.ca2 = data.ca2
  form.cao = data.cao
  form.voltage = data.voltage
})

const router = useRouter()
const form = reactive({
  date: '2024-10-01',
  time: '08:00',
  sampleDepth: 3500,
  sampleTemperature: 56,
  liquid: '白油基',
  density: 2.07,
  funnelViscosity: 76,
  gradientModel: 5,
  r600: 107,
  r300: 60,
  r200: 33,
  r100: 26,
  r6: 6,
  r3: 4,
  bgzd: '',
  sxzd: '',
  dql: '',
  dsb: '',
  s10: 4,
  min10: 10,
  sandContent: 0.2,
  alkalinity: 2.5,
  phValue: 0,
  frictionResistance: 0,
  bentoniteContent: 0,
  filtrationLoss: 0,
  thickMudCake: 0,
  oilContent: 0,
  waterContent: 0,
  oilWaterRatio: '0:0',
  solidContent: 0,
  ionCi: 0,
  ionCa: 0,
  contentPm: 0,
  contentPfMf: 0,
  salinity: 0,
  ca: 0,
  ca2: 0,
  cao: 0,
  voltage: 0
})

const fieldList = {
  required: [
    {
      key: 'date',
      name: 'date',
      label: '日期',
      required: true,
      'is-link': true,
      'label-align': 'top',
      fn: () => {
        showDatePicker.value = true
      }
    },
    {
      key: 'time',
      name: 'time',
      label: '时间',
      required: true,
      'is-link': true,
      'label-align': 'top',
      fn: () => {
        showTimePicker.value = true
      }
    },
    {
      key: 'sampleDepth',
      name: 'sampleDepth',
      label: '取样井深（m）',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'sampleTemperature',
      name: 'sampleTemperature',
      label: '取样温度（℃）',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'liquid',
      name: 'liquid',
      label: '钻井液体系',
      type: 'text',
      required: true,
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'density',
      name: 'density',
      type: 'number',
      label: '密度(g/cm³)',
      required: true,
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'funnelViscosity',
      name: 'funnelViscosity',
      label: '漏斗粘度（s）',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'gradientModel',
      name: 'gradientModel',
      label: '流变模型',
      required: true,
      'is-link': false,
      'label-align': 'top',
      fn: () => {
        showLbPicker.value = true
      }
    },
    {
      key: 'r600',
      name: 'r600',
      label: 'R600',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'r300',
      name: 'r300',
      label: 'R300',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top',
      rules: [
        { required: true, message: `不能为空，且需小于R600`, validator: (v) => v < +form.r600 }
      ]
    },
    {
      key: 'r200',
      name: 'r200',
      label: 'R200',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top',
      rules: [
        { required: true, message: `不能为空，且需小于R300`, validator: (v) => v < +form.r300 }
      ]
    },
    {
      key: 'r100',
      name: 'r100',
      label: 'R100',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top',
      rules: [
        { required: true, message: `不能为空，且需小于R200`, validator: (v) => v < +form.r200 }
      ]
    },
    {
      key: 'r6',
      name: 'r6',
      label: 'R6',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top',
      rules: [
        { required: true, message: `不能为空，且需小于R100`, validator: (v) => v < +form.r100 }
      ]
    },
    {
      key: 'r3',
      name: 'r3',
      label: 'R3',
      type: 'number',
      required: true,
      'is-link': false,
      'label-align': 'top',
      rules: [{ required: true, message: `不能为空，且需小于R6`, validator: (v) => v < +form.r6 }]
    }
  ],
  computed: [
    {
      key: 'bgzd',
      name: 'bgzd',
      label: '表观粘度(MPa.s)',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'sxzd',
      name: 'sxzd',
      label: '塑性粘度(MPa.s)',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'dql',
      name: 'dql',
      label: '动切力(Pa)',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'dsb',
      name: 'dsb',
      label: '动塑比Pa/(mPa.s)',
      'is-link': false,
      'label-align': 'top'
    }
  ],
  notRequired: [
    {
      key: 's10',
      name: 's10',
      label: '10s（Pa）',
      'is-link': false,
      type: 'number',
      'label-align': 'top'
    },
    {
      key: 'min10',
      name: 'min10',
      label: '10min（Pa）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'sandContent',
      name: 'sandContent',
      label: '含砂量（%）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'alkalinity',
      name: 'alkalinity',
      label: '碱度（油基）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'phValue',
      name: 'phValue',
      label: 'PH值（水基）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'frictionResistance',
      name: 'frictionResistance',
      label: '摩阻系数（水基）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'bentoniteContent',
      name: 'bentoniteContent',
      label: '膨润土含量（MBT）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'filtrationLoss',
      name: 'filtrationLoss',
      label: '滤失量（mL）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'thickMudCake',
      name: 'thickMudCake',
      label: '泥饼厚（mm）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'oilContent',
      name: 'oilContent',
      label: '含油量（%）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'waterContent',
      name: 'waterContent',
      label: '含水量（%）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'oilWaterRatio',
      name: 'oilWaterRatio',
      label: '油水比',
      type: 'text',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'solidContent',
      name: 'solidContent',
      label: '固相含量（%）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'ionCi',
      name: 'ionCi',
      label: 'Cl¯离子（mg/L）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'ionCa',
      name: 'ionCa',
      label: 'Ca²+离子（mg/L）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'contentPm',
      name: 'contentPm',
      label: 'Pm含量（mL）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'contentPfMf',
      name: 'contentPfMf',
      label: 'Pf/Mf含量（mL）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'salinity',
      name: 'salinity',
      label: '总矿化度（mg/L）',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'ca2',
      name: 'ca2',
      label: 'Ca(OH)2(kg/m³)',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'cao',
      name: 'cao',
      label: 'CaO(kg/m³)',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    },
    {
      key: 'voltage',
      name: 'voltage',
      label: '破乳电压ES(V)',
      type: 'number',
      'is-link': false,
      'label-align': 'top'
    }
  ]
}
// 计算项
const computedFields = reactive({
  // 表观粘度(MPa.s)
  bgzd: computed({
    get() {
      return form.r600 && form.r600 * 0.5
    },
    set(value) {
      form.bgzd = value
    }
  }),
  // 塑性粘度(MPa.s)
  sxzd: computed({
    get() {
      return form.r600 && form.r300 && form.r600 - form.r300
    },
    set(value) {
      form.sxzd = value
    }
  }),
  // 动切力(Pa)
  dql: computed({
    get() {
      // 动切力 = 表观粘度 - 塑性粘度
      return computedFields.bgzd && computedFields.sxzd && computedFields.bgzd - computedFields.sxzd
    },
    set(value) {
      form.dql = value
    }
  }),
  // 动塑比Pa/(mPa.s)
  dsb: computed({
    get() {
      // 动塑比Pa = 动切力/塑性粘度
      const result =
        computedFields.bgzd && computedFields.sxzd && computedFields.bgzd / computedFields.sxzd
      // 小数点后最多保留8位，不够位不补零
      return result?.toString().includes('.') && result.toString().split('.')[1]?.length > 8
        ? result.toFixed(8)
        : result
    },
    set(value) {
      form.dql = value
    }
  })
})
// 流变模型options
const columns = [
  { text: '宾汉（拟合）', value: 1 },
  { text: '宾汉（通用）', value: 2 },
  { text: '幂律（拟合）', value: 3 },
  { text: '幂律（通用）', value: 4 },
  { text: '赫巴（迭代n）', value: 5 },
  { text: '赫巴（迭代τ0）', value: 6 }
]
const selectedModelText = ref('')
const showDatePicker = ref(false)
const showTimePicker = ref(false)
const showLbPicker = ref(false)
const onConfirmDate = ({ selectedValues }) => {
  form.date = selectedValues.join('-')
  showDatePicker.value = false
}
const onConfirmTime = ({ selectedValues }) => {
  form.time = selectedValues.join(':')
  showTimePicker.value = false
}
const onLbConfirm = ({ selectedOptions }) => {
  form.gradientModel = selectedOptions[0]?.value
  selectedModelText.value = selectedOptions[0]?.text
  showLbPicker.value = false
}
/**
 * 表单验证失败触发的回调函数
 * */
const onFailed = (errorInfo) => {
  const isFailed = errorInfo.errors.length > 0
  if (isFailed) {
    showNotify({
      type: 'warning',
      color: '#fff',
      background: '#ff4242',
      message: errorInfo.errors[0].message
    })
  }
}
/**
 * 提交泥浆性能数据
 * @return {Promise<void>}
 */
const submit = async () => {
  const wellId = localStorage.getItem('well-id')
  if (!wellId) {
    showTopMessage('井无效')
  }
  const mud = convert()
  let params = {
    keyword: 'mud',
    wellId: wellId,
    data: mud
  }
  if (code.value === 0) {
    await saveMud(params)
  } else {
    await editMud(params)
  }
}

/**
 * 编辑
 * @param params
 * @return {Promise<void>}
 */
const editMud = async (params) => {
  await Mud.editMud(params)
    .then((result) => {
      const { data } = result
      if (data) {
        showTopMessage('编辑成功')
        router.push('/home')
      } else {
        showTopMessage('编辑失败')
      }
    })
    .catch((error) => {
      showTopMessage(error)
    })
}

/**
 * 保存
 * @param params
 * @return {Promise<void>}
 */
const saveMud = async (params) => {
  await Mud.saveMud(params)
    .then((result) => {
      const { data } = result
      if (data) {
        showTopMessage('保存成功')
        router.push('/home')
      } else {
        showTopMessage('保存失败')
      }
    })
    .catch((error) => {
      showTopMessage(error)
    })
}

/**
 * 数据结构转换
 * @return {[{min10: UnwrapRef<string>, r3: UnwrapRef<string>, phValue: UnwrapRef<string>, r6: UnwrapRef<string>, contentPfMf: UnwrapRef<string>, oilWaterRatio: UnwrapRef<string>, sandContent: UnwrapRef<string>, r100: UnwrapRef<string>, cao: UnwrapRef<string>, sampleTemperature: UnwrapRef<string>, s10: UnwrapRef<string>, thickMudCake: UnwrapRef<string>, waterContent: UnwrapRef<string>, ca: UnwrapRef<string>, sampleTime: *, oilContent: UnwrapRef<string>, bentoniteContent: UnwrapRef<string>, salinity: UnwrapRef<string>, density: UnwrapRef<string>, sampleDepth: UnwrapRef<string>, solidContent: UnwrapRef<string>, contentPm: UnwrapRef<string>, alkalinity: UnwrapRef<string>, voltage: UnwrapRef<string>, r600: UnwrapRef<string>, liquid: UnwrapRef<string>, r200: UnwrapRef<string>, r300: UnwrapRef<string>, filtrationLoss: UnwrapRef<string>, ionCi: UnwrapRef<string>, frictionResistance: UnwrapRef<string>, funnelViscosity: UnwrapRef<string>, gradientModel: UnwrapRef<string>, ionCa: UnwrapRef<string>}]}
 */
const convert = () => {
  return {
    id: form.id,
    sampleTime: form.date + ' ' + form.time,
    sampleDepth: form.sampleDepth,
    sampleTemperature: form.sampleTemperature,
    liquid: form.liquid,
    density: form.density,
    funnelViscosity: form.funnelViscosity,
    gradientModel: form.gradientModel,
    r600: form.r600,
    r300: form.r300,
    r200: form.r200,
    r100: form.r100,
    r6: form.r6,
    r3: form.r3,
    s10: form.s10 || 0,
    min10: form.min10 || 0,
    sandContent: form.sandContent || 0,
    alkalinity: form.alkalinity || 0,
    phValue: form.phValue || 0,
    frictionResistance: form.frictionResistance || 0,
    bentoniteContent: form.bentoniteContent || 0,
    filtrationLoss: form.filtrationLoss || 0,
    filtration: 0,
    mudThickness: 0,
    thickMudCake: form.thickMudCake || 0,
    oilContent: form.oilContent || 0,
    waterContent: form.waterContent || 0,
    oilWaterRatio: form.oilWaterRatio || 0,
    solidContent: form.solidContent || 0,
    ionCi: form.ionCi || 0,
    ionCa: form.ionCa || 0,
    contentPm: form.contentPm || 0,
    contentPfMf: form.contentPfMf || 0,
    salinity: form.salinity || 0,
    ca: form.ca || 0,
    ca2: form.ca2 || 0,
    cao: form.cao || 0,
    voltage: form.voltage || 0
  }
}
</script>

<style lang="scss" scoped>
:deep(.label-class) {
  color: #6c6c6c;
}
</style>
