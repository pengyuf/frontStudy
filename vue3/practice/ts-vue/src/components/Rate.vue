<template>
    <div class="rate-box">
        <span v-for="item in 5" :key="item" class="iconfont icon-pingfen" 
        :class="{ 'active-icon': item <= curRate }"
        @click="setRate(item)"
        @mousemove="mouseMove(item)"
        @mouseleave="mouseOut"
        ></span>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'

const curRate = ref(0)
const oldRate = ref(0)
const isMoving = ref(false)

const setRate = (rate)=>{
    isMoving.value = false
    curRate.value = rate
}

const mouseMove = (rate)=>{
    if(!isMoving.value){
        oldRate.value = curRate.value
    }
    isMoving.value = true
    curRate.value = rate
}

const mouseOut = ()=>{
    if(isMoving.value){
        curRate.value = oldRate.value
    }
}
</script>
<style scoped>
.rate-box {
    cursor: pointer;
}

.iconfont {
    font-size: 40px;
}

.active-icon {
    color: #F7BA2A;
}
</style>