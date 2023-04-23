interface LabelledValue{
    label:string
}

function printLabel(labelledObj:LabelledValue){
    console.log(labelledObj.label)
}


// 可选属性
interface SuqareConfig{
    color?:string;
    width?:string;
}


// 只读属性
interface Point{
    readonly x:number;
    readonly y:number;
}
let p1:Point = {x:10,y:10}
// p1.x = 100  error


// 接口还带有其它任意数量的其它属性
interface SuqareConfig1{
    color?:string;
    width?:string;
    [propName:string]:any
}


// 函数类型
interface SearchFunc{
    (source:string,subString:string):boolean
}


// 可索引的类型
interface StringArray{
    [index:number]:string
}
let myArr:StringArray
myArr = ['1','2']


// 继承接口
interface Shape{
    color:string
}
interface Square extends Shape{
    sideLen:number
}
let square = <Square>{}

