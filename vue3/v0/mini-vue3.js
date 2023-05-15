import { createVNode } from "./vnode.js";

/**
 * 
 * @param {*} options 
 */
function createRenderer(options) {
    const {
        createElement: hostCreateElement,
        insert: hostInsert,
        setElementText: hostSetElementText
    } = options
    function render(vnode, container) {
        patch(null, vnode, container, null, null)
    }
    function patch(n1, n2, container) {
        const { type } = n2
        if (typeof type === 'string') {
            if (!n1) {
                mountElement(n2, container)
            } else {

            }
        } else if (typeof type === 'object') {
            if (!n1) {
                mountComponent(n2, container)
            } else {

            }
        }
    }
    function mountComponent(vnode, container) {
        const instance = {
            vnode,
            type: vnode.type,
            setupState: null,
            isMounted: false,
            subTree: null,
            update: null,
            render: null,
            proxy: null
        }
        vnode.component = instance
        const { setup, render } = vnode.type
        const setupResult = setup()
        if (typeof setupResult == 'object') {
            instance.setupState = proxyRefs(setupResult)
        } else {

        }
        instance.proxy = new Proxy({ _: instance }, {
            get({ _: instance }, key) {
                if (key in instance.setupState) {
                    return instance.setupState[key]
                }
            }
        })
        instance.render = render
        instance.update = effect(() => {
            if (!instance.isMounted) {
                const subTree = (instance.subTree = instance.render.call(instance.proxy))
                patch(null, subTree, container)
                instance.vnode.el = subTree.el
                instance.isMounted = true
            } else {

            }
        })
    }
    function mountElement(vnode, container) {
        const el = (vnode.el = hostCreateElement(vnode.type))
        const { children } = vnode
        if (typeof children === 'string') {
            hostSetElementText(el, children)
        } else if (Array.isArray(children)) {
            children.forEach(v => {
                patch(null, v, el)
            })
        }
        hostInsert(el, container)
    }
    debugger
    return {
        createApp: createAppAPI(render)
    }
}

function createAppAPI(render) {
    return function createApp(rootComponent) {
        const app = {
            mount(rootContainer) {
                const vnode = createVNode(rootComponent)
                render(vnode, rootContainer)
            }
        }
        return app
    }
}

function createElement(type) {
    return document.createElement(type)
}
function insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
}
function setElementText(el, text) {
    el.textContent = text
}
const renderer = createRenderer({
    createElement,
    insert,
    setElementText
})
export function createApp(...args) {
    return renderer.createApp(...args)
}