<template>
  <div class="carousel-box">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'
import { useCarousel } from './use-carousel'

useCarousel()
</script>
<style scoped lang="scss">
.carousel-box {
  cursor: pointer;
  position: relative;
}
</style>