<template>
    <div ref="root" class="carousel-box" :style="{ 'height': height }">
        <slot></slot>
        <!-- <div class="item" v-for="item in 4" :key="item">{{ item }}</div> -->
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'

const props = defineProps({
    height: {
        type: String,
        default: '200px'
    },
    // 初始化激活的幻灯片索引
    initialIndex: {
        type: Number,
        default: 0
    }
})

const root = ref(null)

onMounted(() => {
    console.log(root.value.offsetWidth)
})

</script>
<style scoped>
.carousel-box {
    position: relative;
    border: 1px solid red;
    width: 400px;
    overflow: hidden;
}

.item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f0f0f0;
}
</style>