import {getCurrentInstance} from 'vue'
import {useOrderedChildren} from '../../hooks/use-ordered-children/index.js'
export const useCarousel = ()=>{
    const data = useOrderedChildren(getCurrentInstance()!,'CarouselItem')
    console.log('data',data)
}