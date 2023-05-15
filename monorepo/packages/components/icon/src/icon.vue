<template>
    <i :class="[bem.b()]" :style="style">
        <slot />
    </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks';
import { iconProps } from './icon'
import { isUndefined, addUnit } from '@cobyte-ui/utils';

defineOptions({
    name: 'ElIcon'
})

const bem = useNamespace('icon');
const props = defineProps(iconProps)

// CSSProperties 是 Vue3 提供的 CSS 属性的类型
const style = computed<CSSProperties>(() => {
    if (!props.size && !props.color) return {}
    return {
        fontSize: isUndefined(props.size) ? undefined : addUnit(props.size),
        '--color': props.color
    }
})
</script>