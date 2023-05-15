import { getCurrentInstance, onMounted, provide, ref } from 'vue'
import { useOrderedChildren } from '../../hooks/use-ordered-children'
import { carouselContextKey } from './constant'
/**
 * carousel逻辑处理
 */
export const useCarousel = (
    props,
    emit,
    componentName
) => {
    const {
        children: items,
        addChild: addItem,
        removeChild: removeItem
    } = useOrderedChildren(getCurrentInstance(), 'CarouselItem')


    const root = ref()
    const activeIndex = ref(-1)

    function resetItemPosition() {
        debugger
        items.value.forEach((item, index) => {
            item.calcTranslate(index, activeIndex.value)
        })
    }

    provide(carouselContextKey, {
        root,
        items,
        addItem,
        removeItem
    })

    onMounted(() => {
        resetItemPosition()
    })

    return {

    }
}