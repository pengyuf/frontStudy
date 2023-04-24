<template>
  <div>
    <!-- <AuditControl /> -->
    <!-- <Rate/> -->
    <!-- <Switch/> -->
    <!-- <Upload/> -->
    <!-- <ImgPreview /> -->
    <button @click="addMessage">消息提示</button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'

import AuditControl from './components/AuditControl.vue'
import Rate from './components/Rate.vue'
import Switch from './components/Switch.vue'
import Upload from './components/Upload.vue'
import ImgPreview from './components/ImgPreview.vue'

import messageUtil from './components/message/messageUtil'

function addMessage() {
  messageUtil()
}

</script>

<style scoped></style>
