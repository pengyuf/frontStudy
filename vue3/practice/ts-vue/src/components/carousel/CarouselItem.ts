import type {PropType,ExtractPropTypes} from 'vue'

export const carouselItemProps ={
    name:{
        type:String,
        default:''
    },
    label:{
        type:[String,Number] as PropType<string | number>,
        default:''
    }
}

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>