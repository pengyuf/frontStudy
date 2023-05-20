<template>
    <div :class="ns.b()">
        <input :type="type" ref="input" @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate" @compositionend="handleCompositionEnd" @input="handleInput" />
    </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@cobyte-ui/hooks'
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed, shallowRef, nextTick } from 'vue'
import { UPDATE_MODEL_EVENT } from '../../../constants';
import { inputEmits, inputProps } from './input';

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
    name: 'ElInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const ns = useNamespace('input')

const input = shallowRef<HTMLInputElement>()
const _ref = computed(() => input.value)
const nativeInputValue = computed(() => !props.modelValue ? '' : String(props.modelValue))
const isComposing = ref(false)

const setNativeInputValue = () => {
    const input = _ref.value
    if (!input || input.value === nativeInputValue.value)
        return
    input.value = nativeInputValue.value
}

const handleInput = async (e: Event) => {
    const { value } = e.target as TargetElement
    if (isComposing.value) return
    emit(UPDATE_MODEL_EVENT, value)
    await nextTick()
    setNativeInputValue()
}

const handleCompositionStart = (event: CompositionEvent) => {
    emit('compositionstart', event)
    isComposing.value = true
}
const handleCompositionUpdate = (event: CompositionEvent) => {
    emit('compositionupdate', event)
}
const handleCompositionEnd = (event: CompositionEvent) => {
    emit('compositionend', event)
    if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
    }
}


onMounted(() => {
    setNativeInputValue()
})
</script>