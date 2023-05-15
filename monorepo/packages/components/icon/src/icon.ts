/**
 * ypeScript 提供了 import type or export type，
 * 用来明确表示我引入/导出的是一个类型，而不是一个变量或者方法
 */
import type {ExtractPropTypes,PropType} from 'vue'
import type Icon from './icon.vue'

// icon组件props
/**
 * as const
 * prop数据是单向传递的。在基于ts开发时，就会把prop设置为只读属性。
 * 通过as const可以快速将一个对象变成只读类型
 */
export const iconProps = {
    color:String,
    // 数组项，还需要通过 Vue3 内置的 PropType 类型声明进行具体的类型断言声明
    size:[Number,String] as PropType<number | string>
} as const

/**
 * 在 TypeScript 中类有 2 种类型, 静态类型和实例类型, 如果是构造函数类型, 那么返回的则是实例类型。
 * 我们在原生 Vue3 中定义 props 类型，其实是一个构造函数，
 * 比如上述我们定义  color 的类型是 String，但 String 只是一个构造函数，
 * 并不是 TypeScript 中的 string 类型，
 * String 构造函数在 TypeScript 的类型是它的构造函数类型： StringConstructor ，
 * 但这并不是我们需要的，我们希望 String 构造函数返回的是字符串类型 string
 *
 * 
 * ExtractPropTypes的作用时接收一个类型，然后把对应的props类型返回出来，
 * 如果是构造函数类型则转化为对应的类型（StringConstructor --> string）
 */
export type Props = ExtractPropTypes<typeof iconProps>
/**
 * TypeScript 中的 InstanceType 函数：
 * 该函数返回（构造） 由某个构造函数构造出来的实例类型组成的类型
 */
export type IconInstance = InstanceType<typeof Icon>