const fs = require('fs')
const path = require('path')
const espree = require('espree')

const filePath = path.resolve('./test.js')
// 已utf8的格式读取文件内容
const text = fs.readFileSync(filePath,'utf8')

// 编译成源码AST
const ast = espree.parse(text,{
    comment:true,
    ecmaVersion:6,
    ecmaFeatures:{
        jsx:true,
        globalReturn:true
    },
    loc:true,
    range:true,
    tokens:true
})

// eslint对源码ast进行二次封装
const sourceCode = new SourceCode({
    text,
    ast
})

// 将ast组装成数组形式
const nodeQueue = []
Traverse.traverse(sourceCode.ast,{
    enter(node,parent){
        node.parent = parent
        nodeQueue.push({isEntering:true,node})
    },
    leave(node){
        nodeQueue.push({isEntering:false,node})
    },
    visitorKeys:sourceCode.visitorKeys
})



// 创建规则插件的核心代码
const rule = require('./rules-module/no-var')
const lintingProblems = []
let reportTranslator = null
const ruleContext = {
    getSourceCode:()=>sourceCode,
    report(...args){
        if(reportTranslator == null){
            reportTranslator = createReportTranslator({
                sourceCode
            })
        }
        const problem = reportTranslator(...args)
        lintingProblems.push(problem)
    }
}
const ruleListeners = rule.create(ruleContext)

// 调度中心
module.exports = ()=>{
    const listeners = Object.create(null)
    return Object.freeze({
        // 订阅
        on(eventName,listener){
            if(eventName in listeners){
                listeners[eventName].push(listener)
            }else{
                listeners[eventName] = [listener]
            }
        },
        // 发布
        emit(eventName,...args){
            if(eventName in listeners){
                listeners[eventName].forEach(listener=>listener(...args))
            }
        },
        eventNames(){
            return Object.keys(listeners)
        }
    })
}