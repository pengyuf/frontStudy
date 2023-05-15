<template>
    <div ref="root" class="carousel-box" :style="{ 'height': height }">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'
import { useCarousel } from './use-carousel'

const props = defineProps({
    height: {
        type: String,
        default: '200px'
    },
    // 初始化激活的幻灯片索引
    initialIndex: {
        type: Number,
        default: 0
    },
    autoplay: {
        type: Boolean,
        default: true
    },
    interval: {
        type: Number,
        default: 3000
    }
})

useCarousel()
</script>
<style scoped>
.carousel-box {
    position: relative;
    border: 1px solid red;
    width: 400px;
    overflow: hidden;
}
</style>