<template>
  <div class="app-box">
    <!-- <AuditControl /> -->
    <!-- <Rate/> -->
    <!-- <Switch/> -->
    <!-- <Upload/> -->
    <!-- <ImgPreview /> -->
    <!-- <button @click="addMessage">消息提示</button> -->
    <Carousel>
      <CarouselItem v-for="item in 4" :key="item" :translate="(item - 1) * 400">{{ item }}</CarouselItem>
    </Carousel>
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
import Carousel from './components/carousel/Carousel.vue'
import CarouselItem from './components/carousel/CarouselItem.vue'

function addMessage() {
  messageUtil()
}

</script>

<style scoped>
.app-box {
  display: flex;
  justify-content: center;
}
</style>
