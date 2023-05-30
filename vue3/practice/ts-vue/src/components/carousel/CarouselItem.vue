<template>
    <div class="carousel-item" :style="itemStyle">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { useCarouselItem } from './use-carousel-item'
import { carouselItemProps } from './CarouselItem'
import { computed, unref } from 'vue'


const COMPONENT_NAME = 'CarouselItem'
const props = defineProps(carouselItemProps)

const { translate } = useCarouselItem(props, COMPONENT_NAME)
const itemStyle = computed(() => {
    const _translate = `translateX(${unref(translate)}px)`
    const _scale = `scale(1)`
    const transform = [_translate, _scale].join(' ')
    return {
        transform
    }
})
</script>
<style scoped lang="scss">
.carousel-item {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition:transform 0.4s ease-in-out;
}
</style>