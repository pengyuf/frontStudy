<template>
   <div>
      <!-- <el-icon :color="'red'" :size="12">Icon</el-icon> -->
      <!-- <el-button type="primary" ref="buttonRef">primary</el-button>
      <el-button type="danger" :loading="false" :loadingIcon="User">
         <template #icon>
            <Edit />
         </template>
      </el-button>
      <el-button-group type="success" size="large">
         <el-button>按钮1</el-button>
         <el-button>按钮2</el-button>
      </el-button-group> -->
      <el-input v-model="state" />
   </div>
</template>

<script setup lang="ts">
// import ElIcon from '@cobyte-ui/components/icon';
// import '@cobyte-ui/theme-chalk/src/index.scss';
import { Edit, User } from '@element-plus/icons-vue'
import { nextTick, ref, watch } from "vue";

// const buttonRef = ref()
// nextTick(() => {
//    console.log('buttonRef', buttonRef.value.ref)
// })

const state = ref('Cobyte')
watch(
  () => state.value,
  (newVal) => {
    console.log('state值：', newVal)
  }
)
</script>

<style scoped>
.juejin{
   color: var(--el-color-primary)
}
</style>
