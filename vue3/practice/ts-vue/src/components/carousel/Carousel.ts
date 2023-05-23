import type {PropType,ExtractPropTypes} from 'vue'
import {isNumber} from '../../utils/util'

export type carouselDirection = 'horizontal' | 'vertical'

export const carouselProps = {
    height:{
        type:String,
        default:'200px'
    },
    autoplay:{
        type:Boolean,
        default:true
    },
    interval:{
        type:Number,
        default:3000
    },
    loop:{
        type:Boolean,
        default:true
    },
    direction:{
        type:String as PropType<carouselDirection>,
        default:'horizontal'
    }
} as const

export type CarouselProps = ExtractPropTypes<typeof carouselProps>


export const carouselEmits = {
   change:(cur:number,prev:number)=> [cur,prev].every(isNumber)
}

export type CarouselEmits = typeof carouselEmits