import { isArray } from '@vue/shared'
import { isVNode } from 'vue'

/**
 * 
 * @param {*} children vnode树
 * 结构扁平化
 */
export const flattedChildren = (children) => {
    const vNodes = isArray(children) ? children : [children]
    const result = []
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