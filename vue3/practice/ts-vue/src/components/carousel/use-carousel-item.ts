import { inject, getCurrentInstance, ref, onMounted } from 'vue'
import type { CarouselItemProps } from './CarouselItem'
import { carouselContextKey } from '../../tokens/index'

export const useCarouselItem = (props: CarouselItemProps, compName: string) => {
    // 从父组件的provide获取数据
    const carouselContext: any = inject(carouselContextKey)!

    // 获取当前item的实例
    const instance = getCurrentInstance()!
    const active = ref(false)
    // item偏移的距离
    const translate = ref(0)

    // 计算item偏移视图的距离
    function calcTranslate(index: number, activeIndex: number): number {
        const rootEl = carouselContext.root.value
        if (!rootEl) return 0
        const distance = rootEl.offsetWidth || 0
        return distance * (index - activeIndex)
    }

    const translateItem = (index: number, activeIndex: number) => {
        const isActive = index === activeIndex
        active.value = isActive
        translate.value = calcTranslate(index, activeIndex)
    }

    onMounted(() => {
        carouselContext.addItem({
            uid: instance.uid,
            translateItem
        })
    })

    return {
        translate
    }
}