<template>
    <div>
        <div class="play-box">
            <div ref="slider" class="slider-box" @click="clickSlider">
                <div class="inner-box" :style="{ width: moveWidth + '%' }"></div>
                <div class="slider-dot" :style="{ left: moveWidth + '%' }" @mousedown="mouseDown" @mouseup="mouseUp"
                    @mousemove="mouseMove">
                    <div class="inner-dot"></div>
                </div>
            </div>
        </div>
        <div class="time-box">
            {{ curPlayTime }}/{{ auditList[curAudit] }}
        </div>
        <div class="control-box">
            <div class="iconfont icon-back-audio" @click="changeAudit('back')"></div>
            <div class="iconfont icon-bofang03" @click="play" v-if="isStop"></div>
            <div class="iconfont icon-zanting" @click="stop" v-else></div>
            <div class="iconfont icon-next-audio" @click="changeAudit('next')"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed, watch } from 'vue'
import { getFloat } from '../utils/util'

const auditList = [
    '01:10',
    '01:31',
    '0:31',
    '01:01'
]
const pxToPrecent = 4.6 // 1/100的像素是多少
const slider = ref(null)
const isStop = ref(true)
const totalTime = ref(20)
const curAudit = ref(0)

const timer = ref(0)
const moveWidth = ref(0)

const unitMove = computed(() => {
    const unit = 100 / totalTime.value
    return getFloat(unit, 4)
})

const curPlayTime = computed(() => {
    let minute = Math.floor(timer.value / 60)
    let second = timer.value - (minute * 60)
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return minute + ':' + second
})

watch(curAudit, (newIndex) => {
    timer.value = 0
    moveWidth.value = 0
    initTotalTime(auditList[curAudit.value])
})

onMounted(() => {
    initTotalTime(auditList[curAudit.value])
})

function moveing() {
    timer.value++
    if (!isStop.value) {
        if (timer.value <= totalTime.value) {
            setTimeout(() => {
                moveWidth.value = moveWidth.value + unitMove.value
                console.log(moveWidth.value, timer.value)
                moveing()
            }, 1000)
        } else {
            isStop.value = true
            timer.value = 0
            moveWidth.value = 0
        }
    }
}

function play() {
    isStop.value = false
    moveing()
}

function stop() {
    isStop.value = true
}

function clickSlider(e) {
    // console.log('click', e.offsetX)
    const offsetX = e.offsetX
    const precent = Math.floor(offsetX / pxToPrecent)
    const second = Math.floor(precent / unitMove.value)
    timer.value = second
    moveWidth.value = second * unitMove.value
}

function initTotalTime(time) {
    const timeArr = time.split(':')
    const minute = timeArr[0]
    const second = timeArr[1]
    totalTime.value = (parseInt(minute) * 60) + (parseInt(second))
}

function changeAudit(type) {
    if (type == 'next') {
        if (curAudit.value == 3) {
            curAudit.value = 0
        } else {
            curAudit.value++
        }
    } else {
        if (curAudit.value == 0) {
            curAudit.value = 3
        } else {
            curAudit.value--
        }
    }
}

function mouseDown(e) {
    console.log('mouseDown', e)
}

function mouseUp(e) {
    console.log('mouseUp', e)
}

function mouseMove(e) {
    console.log('mouseMove', e)
}

</script>

<style scoped>
.play-box {
    display: flex;
    align-items: center;
}

.time-box {
    margin-left: 10px;
}

.slider-box {
    width: 466px;
    height: 14px;
    background-color: #e6e6e6;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
}

.inner-box {
    height: 14px;
    position: absolute;
    border-radius: 10px;
    background-color: red;
    width: 0%;
}

.slider-dot {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0%;
    margin-top: -10px;
    margin-left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inner-dot {
    width: 6px;
    height: 6px;
    background: #e6e6e6;
    border-radius: 50%;
}

.control-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.control-box .iconfont {
    cursor: pointer;
    color: #666;
    font-size: 34px;
    margin: 0 10px;
}
</style>