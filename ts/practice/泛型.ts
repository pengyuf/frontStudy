function identity<T>(arg: T): T {
    return arg
}

let output = identity<string>('123')
let output1 = identity(1)

