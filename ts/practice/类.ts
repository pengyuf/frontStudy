class Greeter{
    greeting:string;
    constructor(msg:string){
        this.greeting = msg
    }
    greet(){
        return this.greeting
    }
}

class Animal{
    private name:string;
    constructor(name:string){
       this.name = name
    }
    move(distance:number = 0){
        console.log(`${this.name} moved ${distance}`)
    }
}

class Snake extends Animal{
    constructor(name:string){
        super(name)
    }
    move(distance:number = 5){
        super.move(distance)
    }
}

class Horse extends Animal{
    constructor(name:string){
        super(name)
    }
    move(distance: number = 45){
        super.move(distance)
    }
}

let passcode = 'passcode'

class Employee{
    private _fullName:string;
    get fullName():string{
        return this._fullName
    }
    set fullName(newName:string){
        if(passcode == 'passcode'){
            this._fullName = newName
        }else{
            console.log('error passcode')
        }
    }
}