import type { ExtractPropTypes, PropType } from 'vue'
import type Button from './button.vue'

// 点击事件
export const buttonEmits = {
    click: (e: MouseEvent) => e instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits

// 使用type定义按钮样式
export type ButtonType =
    | ''
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
    | 'text'
// 原始类型
export type ButtonNativeType = 'button' | 'submit' | 'reset'

// 组件大小
export type ButtonSize = '' | 'default' | 'small' | 'large'
// 定义props
export const buttonProps = {
    size: String as PropType<ButtonSize>,
    type:{
        type:String as PropType<ButtonType>
    },
    nativeType:{
        type:String as PropType<ButtonNativeType>,
        default:'button'
    },
    disabled: Boolean,
    autofocus: Boolean,
    round: Boolean,
    plain: Boolean,
    circle: Boolean,
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonInstance = InstanceType<typeof Button>