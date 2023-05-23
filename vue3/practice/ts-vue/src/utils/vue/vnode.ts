import {
    Comment,
    Fragment,
    Text,
    createBlock,
    createCommentVNode,
    isVNode,
    openBlock,
  } from 'vue'
import { isArray } from '@vue/shared'
import type {
    VNode,
    VNodeArrayChildren,
    VNodeChild,
    VNodeNormalizedChildren,
} from 'vue'

export type VNodeChildAtom = Exclude<VNodeChild, Array<any>>
export type RawSlots = Exclude<
  VNodeNormalizedChildren,
  Array<any> | null | string
>
export type FlattenVNodes = Array<VNodeChildAtom | RawSlots>

/**
 * 
 * @param {*} children vnode树
 * 结构扁平化
 */
export const flattedChildren = (
    children: FlattenVNodes | VNode | VNodeNormalizedChildren
) => {
    const vNodes = isArray(children) ? children : [children]
    const result:FlattenVNodes = []
    vNodes.forEach(child => {
        if (isArray(child)) {
            result.push(...flattedChildren(child))
        }
        else if (isVNode(child) && isArray(child.children)) {
            result.push(...flattedChildren(child.children))
        }
        else {
            result.push(child)
            if (isVNode(child) && child.component.subTree) {
                result.push(...flattedChildren(child.component.subTree))
            }
        }
    })
    return result
}