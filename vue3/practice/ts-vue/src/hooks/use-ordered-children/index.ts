import { isVNode, shallowRef } from "vue"
import { flattedChildren } from "../../utils/vue/vnode"
import { ComponentInternalInstance, VNode } from 'vue'

const getOrderedChildren = <T>(vm: ComponentInternalInstance,
    childComponentName: string, children: Record<number, T>): T[] => {
    const nodes = flattedChildren(vm.subTree).filter(
        (n): n is VNode =>
            isVNode(n) && (n.type as any)?.name === childComponentName &&
            !!n.component
    )
    const uids = nodes.map((n) => n.component!.uid)
    return uids.map((uid) => children[uid]).filter((p) => !!p)
}


/**
 * 
 * @param {*} vm 父组件实例
 * @param {*} childComponentName 需要获取的子组件名称 
 */
export const useOrderedChildren = <T extends { uid: number }>(
    vm: ComponentInternalInstance,
    childComponentName: string
) => {
    // console.log('getCurrentInstance',vm)
    const children: Record<number, T> = {}
    const orderedChildren = shallowRef<T[]>([])

    const addChild = (child: T) => {
        children[child.uid] = child
        orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
    }
    const removeChild = (uid: number) => {
        delete children[uid]
        orderedChildren.value = orderedChildren.value.filter(
            (children) => children.uid !== uid
        )
    }
    return {
        children: orderedChildren,
        addChild,
        removeChild
    }
}