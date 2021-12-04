/*
* @description 获取一个对象的所有自身属性的描述符，默认值为空对象
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
* @year 2017
*/

const baseObject ={}

// 修饰符  configurable  enumerable   value      writable  get        set
// 默认值  false         false        undefined  false     undefined  undefined

Object.defineProperties(baseObject,{
    enumerable:{
        value:"我是可枚举的",
        configurable:true,
        enumerable:true,
        writable:true,
    },
    nonEnumerable:{
        value:"我是不可枚举的",
        configurable:true,
        writable:true,
    },
    writable:{
        value:'我是可写的',
        configurable:true,
        enumerable:true,
        writable:true,
    },
    nonWritable:{
      value:"我是不可写的",
      configurable:true,
      enumerable:true,
    },
    configurable:{
        value:"我是可配置的",
        configurable:true,
        enumerable:true,
        writable:true,
    },
    nonConfigurable:{
        value:"我是不可配置的",
        configurable:false,
        enumerable:true,
        writable:true,
    },
})
baseObject[Symbol("a")]="我是symbol"

console.log(baseObject) //{configurable: "我是可配置的",enumerable: "我是可枚举的",nonConfigurable: "我是不可配置的",nonWritable: "我是不可写的",writable: "我是可写的",nonEnumerable: "我是不可枚举的}

// 基本操作
// { configurable: {value: '我是可配置的', writable: true, enumerable: true, configurable: true},
// enumerable: {value: '我是可枚举的', writable: true, enumerable: true, configurable: true},
// nonConfigurable: {value: '我是不可配置的', writable: true, enumerable: true, configurable: false},
// nonEnumerable: {value: '我是不可枚举的', writable: true, enumerable: false, configurable: true},
// nonWritable: {value: '我是不可写的', writable: false, enumerable: true, configurable: true},
// writable: {value: '我是可写的', writable: true, enumerable: true, configurable: true},
// Symbol(a): {value: '我是symbol', writable: true, enumerable: true, configurable: true}, }
// 会返回所有的修饰
console.log(Object.getOwnPropertyDescriptors(baseObject))

// 扩展
// 1、返回单个的修饰符 Object.getOwnPropertyDescriptor(obj, prop)
console.log(Object.getOwnPropertyDescriptor(baseObject,'nonConfigurable')) //{value: '我是不可配置的',writable: true,enumerable: true,configurable: false}
// 不存在则会返回undefined
console.log(Object.getOwnPropertyDescriptor(baseObject,'nonConfigurable1'))

// 2、异同
// Object.getOwnPropertyNames():Array 获取所有属性的名称不包含symbol
// Object.getOwnPropertySymbols():Array  获取对象key为symbol的属性
// Object.getOwnPropertyNames() + Object.getOwnPropertySymbols() = Object.getOwnPropertyDescriptors()
console.log(Object.getOwnPropertyNames(baseObject)) // ['enumerable','nonEnumerable','writable','nonWritable','configurable','nonConfigurable']
console.log(Object.getOwnPropertySymbols(baseObject)) // [ Symbol(a) ]



