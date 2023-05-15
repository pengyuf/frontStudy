<template>
    <div class="carousel-item" :style="itemStyle">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed, unref } from 'vue'
import { useCarouselItem } from './use-carousel-item'

const { translate } = useCarouselItem()

const itemStyle = computed(() => {
    const transform = `translateX(${unref(translate)}px) scale(1)`
    return {
        transform
    }
})

</script>
<style scoped>
.carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f0f0f0;
}
</style>