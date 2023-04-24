<template>
    <Transition @before-leave="close">
        <div class="message-box" v-show="show" :style="{ top: offset + 'px' }" @mouseleave="startTimer"
            @mouseenter="clearTimer">messageCmp{{ id }}</div>
    </Transition>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'

let timer;

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    offset: {
        type: Number,
        default: 16
    },
    duration: {
        type: Number,
        default: 5000
    },
    onClose: {
        type: Function,
        default: () => { }
    },
    onDestroy: {
        type: Function,
        default: () => { }
    },
})

const show = ref(false)

onMounted(() => {
    show.value = true
    startTimer()
})

const startTimer = () => {
    timer = setTimeout(() => {
        show.value = false
    }, props.duration);
}

const clearTimer = () => {
    clearTimeout(timer)
}

const close = () => {
    props.onClose(props.id)
}

</script>
<style scoped>
.message-box {
    position: absolute;
    background: blue;
    color: #fff;
    left: 50%;
    width: 200px;
    height: 50px;
}
</style>