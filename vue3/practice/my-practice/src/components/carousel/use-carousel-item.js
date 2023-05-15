import { getCurrentInstance, inject, onMounted, onUnmounted, ref } from "vue"
import { carouselContextKey } from "./constant"

export const useCarouselItem = (
    props,
    componentName
) => {
    // 从父组件获取数据
    const carouselContext = inject(carouselContextKey)
    // 组件实例
    const instance = getCurrentInstance()

    const translate = ref(0)

    function calcTranslate(index, activeIndex) {
        const rootEl = carouselContext.root.value
        if (!rootEl) return 0

        const distance = rootEl.offsetWidth
        return distance * (index - activeIndex)
    }

    onMounted(() => {
        carouselContext.addItem({
            uid: instance.uid,
            calcTranslate
        })
    })

    onUnmounted(() => {
        carouselContext.removeItem(instance.uid)
    })

    return{
        translate
    }
}