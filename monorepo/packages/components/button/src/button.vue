<template>
    <button ref="_ref" :class="[ns.b(),
    ns.m(type),
    ns.m(size),
    ns.is('disabled', disabled),
    ns.is('plain', plain),
    ns.is('round', round),
    ns.is('circle', circle),]" :disabled="disabled" :autofocus="autofocus" :type="nativeType" @click="handleClick">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { ref, inject, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { buttonEmits, buttonProps } from './button'
import {buttonGroupContextKey} from '@cobyte-ui/tokens'

defineOptions({
    name: "ElButton"
})

const buttonGroupContext = inject(buttonGroupContextKey)

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')

const _ref = ref<HTMLButtonElement>()

const _size = computed(()=>props.size || buttonGroupContext?.size)
const _type = computed(()=>props.type || buttonGroupContext?.type)

const handleClick = (e: MouseEvent) => {
    emit("click", e)
}

defineExpose({
    ref: _ref
})
</script>