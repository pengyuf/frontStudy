import { createVNode } from "vue"

const App = {
    name:"App",
    setup(){
        return{
            count:5
        }
    },
    render(){
        return createVNode('div',{class:'red'},'asdf')
    }
}