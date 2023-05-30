import { getCurrentInstance, onMounted, provide, ref, shallowRef, watch } from 'vue'
import { useOrderedChildren } from '../../hooks/use-ordered-children/index.js'
import { carouselContextKey } from '../../tokens/carousel.js'
import { useResizeObserver } from '@vueuse/core'
import type { CarouselProps } from './Carousel.js'
export const useCarousel = (props: CarouselProps) => {
    const THROTTLE_TIME = 300

    const {
        children: items,
        addChild: addItem,
        removeChild: removeItem
    } = useOrderedChildren(getCurrentInstance()!, 'CarouselItem')

    const root = ref<HTMLElement>()
    const activeIndex = ref(0)
    const timer = ref()
    const hover = ref(false) // 是否显示箭头

    function resetPosition() {
        items.value.forEach((item, index) => {
            (item as any).translateItem(index, activeIndex.value)
        })
    }

    function handlerMouseEnter() {
        hover.value = true
        pauseTimer()
    }

    function handleMouseLeave() {
        hover.value = false
        startTimer()
    }

    const arrowClick = (direction: 'left' | 'right') => {
        const cur = activeIndex.value
        if (direction == 'left') {
            if (cur > 0) {
                activeIndex.value = activeIndex.value - 1
            }
        }
        if (direction == 'right') {
            if (cur < items.value.length - 1) {
                activeIndex.value = activeIndex.value + 1
            }
        }
    }

    const indicatorClick = (index:number)=>{
          activeIndex.value = index
    }

    const startTimer = () => {
        if (!props.autoplay || timer.value) return
        timer.value = setInterval(() => playSlides(), props.interval);
    }

    const pauseTimer = () => {
        if (timer.value) {
            clearInterval(timer.value)
            timer.value = null
        }
    }

    const playSlides = () => {
        if (activeIndex.value < items.value.length - 1) {
            activeIndex.value = activeIndex.value + 1
        } else if (props.loop) {
            activeIndex.value = 0
        }
    }
    watch(() => activeIndex.value, () => {
        resetPosition()
    })

    watch(() => items.value, () => {
        resetPosition()
    })

    // 提供给后代
    provide(carouselContextKey, {
        addItem,
        removeItem,
        items,
        root
    })

    const resizeObserver = shallowRef()
    onMounted(() => {
        resizeObserver.value = useResizeObserver(root.value, () => {
            resetPosition()
        })
        startTimer()
    })

    return {
        root,
        hover,
        items,
        activeIndex,
        handlerMouseEnter,
        handleMouseLeave,
        arrowClick,
        indicatorClick
    }
}