<template>
  <!-- <AuditControl /> -->
  <!-- <Rate /> -->
  <!-- <Switch /> -->
  <!-- <Upload /> -->
  <!-- <ImgPreview /> -->
  <!-- <button @click="addMessage">消息提示</button> -->
  <Carousel>
    <CarouselItem v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </CarouselItem>
  </Carousel>
</template>

<script setup lang="ts">
import AuditControl from './components/AuditControl.vue'
import Rate from './components/Rate.vue'
import Switch from './components/Switch.vue'
import Upload from './components/Upload.vue'
import ImgPreview from './components/ImgPreview.vue'
import messageUtil from './components/message/messageUtil'
import Carousel from './components/carousel/Carousel.vue'
import CarouselItem from './components/carousel/CarouselItem.vue'
</script>

<style scoped>
.carousel-item:nth-child(2n) {
  background-color: #99a9bf;
}

.carousel-item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
