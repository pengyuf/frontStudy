import { inject, getCurrentInstance,ref } from 'vue'
import type { CarouselItemProps } from './CarouselItem'
import { carouselContextKey } from '../../tokens/index'

export const useCarouselItem = (props: CarouselItemProps, compName: string) => {
    // 从父组件的provide获取数据
    const carouselContext = inject(carouselContextKey)!

    // 获取当前item的实例
    const instance = getCurrentInstance()!

    // item偏移的距离
    const translate = ref(0)

    // 计算item偏移视图的距离
    function calcTranslate(index:number,activeIndex:number){
         const rootEl = carouselContext.root.value
         if(!rootEl)return
         const distance = rootEl.offsetWidth || 0
         return distance * (index - activeIndex)
    }

    
}