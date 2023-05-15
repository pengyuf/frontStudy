// 函数类型
function add(x:number,y:number):number{
    return x+y
}

let myAdd:(x:number,y:number)=>number = function(x:number,y:number):number{
    return x+y
}

// 剩余参数
function buildName(firstName:string,...restOfName:string[]){
    return firstName + ' ' + restOfName.join(' ')
}






