<template>
    <div class="carousel-item" :style="{ transform: transform }">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'

const props = defineProps({
    translate: {
        type: Number,
        default: 0
    }
})


const transform = computed(() => {
    return `translateX(${props.translate}px) scale(1)`
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