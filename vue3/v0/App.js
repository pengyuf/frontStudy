import {createVNode} from './vnode.js'
/**
 * vue组件本质上就是一个js对象
 */
export const App = {
    name:'App',
    setup(){
        return{
            count:12
        }
    },
    // SFC不需要写render，render通过模版编译生成
    render(){
        return createVNode('div',{},'hello'+this.count)
    }
}