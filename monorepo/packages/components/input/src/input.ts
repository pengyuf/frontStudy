import { isString } from "@vue/shared";
import { ExtractPropTypes, getCurrentInstance, PropType } from "vue";
import { UPDATE_MODEL_EVENT } from "../../../constants";
import type Input from './input.vue'

export const inputProps = {
    modelValue: {
        type: [String, Number, Object] as PropType<string | number | object>,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
} as const

export const inputEmits = {
    [UPDATE_MODEL_EVENT]: (val: string) => isString(val),
    compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
    compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
    compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
export type InputInstance = InstanceType<typeof Input>