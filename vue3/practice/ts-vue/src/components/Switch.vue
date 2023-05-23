<template>
    <div :class="{ 'switch-box': true, 'active-switch-box': active, disabled: disable }" @click="changeSwitch">
        <div :class="['inner-dot', active ? 'active-inner-dot' : 'unactive-inner-dot']"></div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'

const props = defineProps({
    disable: {
        type: Boolean,
        default: false
    }
})

const active = ref(false)


function changeSwitch() {
    if (props.disable) {
        return
    }
    active.value = !active.value
}

</script>
<style scoped>
.switch-box {
    cursor: pointer;
    width: 50px;
    height: 20px;
    background: #DCDFE6;
    position: relative;
    padding: 2px 0;
    border-radius: 20px;
    transition: background 0.5s;
}

.disabled {
    cursor: no-drop;
}

.inner-dot {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    transition: left 0.5s;
}

.active-switch-box {
    background: #13CE66;
}

.unactive-inner-dot {
    left: 2px;
}

.active-inner-dot {
    left: calc(100% - 22px);
}
</style>