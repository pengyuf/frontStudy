import {getCurrentInstance} from 'vue'
import {useOrderedChildren} from '../../hooks/use-ordered-children/index.js'
export const useCarousel = ()=>{
    const {
        children:items,
        addChild:addItem,
        removeChild:removeItem
    } = useOrderedChildren(getCurrentInstance()!,'CarouselItem')
}