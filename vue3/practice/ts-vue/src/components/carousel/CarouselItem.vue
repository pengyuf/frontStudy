<template>
    <div class="carousel-item">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'
import { useCarouselItem } from './use-carousel-item'
import { carouselItemProps } from './CarouselItem'


const COMPONENT_NAME = 'CarouselItem'
const props = defineProps(carouselItemProps)

useCarouselItem(props, COMPONENT_NAME)
</script>
<style scoped lang="scss">
.carousel-item {}
</style>