import { isVNode, shallowRef } from "vue"
import { flattedChildren } from "../../utils/vue/vnode"

const getOrderedChildren = (vm, childComponentName, children) => {
    const nodes = flattedChildren(vm.subTree).filter(
        n => isVNode(n) && n.name === childComponentName && !!n.component
    )
    const uids = nodes.map((n) => n.component.uid)
    return uids.map((uid) => children[uid]).filter((p) => !!p)
}


/**
 * 
 * @param {*} vm 父组件实例
 * @param {*} childComponentName 需要获取的子组件名称 
 */
export const useOrderedChildren = (
    vm,
    childComponentName
) => {
    const children = {}
    const orderedChildren = shallowRef([])

    const addChild = (child) => {
        children[child.uid] = child
        orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
    }
    const removeChild = (uid) => {
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