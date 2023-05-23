import { createVNode, render } from 'vue'
import MessageConstructor from './Message.vue'

let seed = 0
let appendTo = document.body
let instances = []
let offset = 16

const messageUtil = () => {
    const container = document.createElement('div')
    container.className = 'message-container'
    seed++;

    const props = {
        id: seed,
        offset: verticalOffset(),
        // onClose: () => {
        //     close(seed)
        // }
        onClose: close
    }

    const vnode = createVNode(MessageConstructor, props)
    instances.push(vnode)
    render(vnode, container)
    appendTo.appendChild(container.firstElementChild)
}

// 计算垂直方向的偏移量
const verticalOffset = () => {
    let verticalOffset = offset
    instances.forEach((vInstance) => {
        verticalOffset += (vInstance.el?.offsetHeight || 0) + offset
    })
    return verticalOffset
}

// 组件移除时，改变其它组件的offset
const close = (vmId) => {
    const delIndex = vmId - 1
    if (delIndex == -1) {
        return
    }
    const delOffsetHeight = instances[delIndex].el.offsetHeight + offset

    instances.splice(delIndex, 1)

    const len = instances.length
    if (len == 0) {
        return
    }

    instances.forEach(item => {
        const pos = parseInt(item.el.style.top, 10) - delOffsetHeight
        item.component.props.offset = pos
    })
}

export default messageUtil