/*
* @description 遍历对象
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
* @year 2017
*/

// 基本操作
let object = {
    a:"我是a",
    b:()=>{
        console.log("我是一个函数")
    },
    c:new Map(),
    d:null,
    e:function name(){
        console.log("我是一个具名函数")
    },
    f:Symbol('这是symbol')
}

// 遍历value值
// 注意这里是可查到symbol的
console.log(Object.values(object)) // ['我是a',()=>{ console.log("我是一个函数")},Map(0),null,name,Symbol('这是symbol')]

// 遍历每个对象
// 注意里面的每个数据都是数组并不是keyValue格式的对象
console.log(Object.entries(object))  // [['a', '我是a'],['b', ()=>{ console.log("我是一个函数")],['c', Map(0)],['d', null] ,['e', name],['f',Symbol('这是symbol')]]


// 注意：
// 1、遍历的对象的key需要是可枚举的数据即对应key的enumerable为true，(默认为true)
object =  Object.create({},{
    enumerable:{
        value:"我是可枚举的",
        enumerable:true
    },
    nonEnumerable:{
        value:"我是不可枚举的",
        enumerable:false
    }
})

// 遍历value值
console.log(Object.values(object)) // ['我是可枚举的']

// 遍历每个对象
console.log(Object.entries(object))  // [[enumerable,'我是可枚举的']]

// 2、与for-in for-of的异同点
//                 object...  for-in   for-of
// 1、迭代顺序方面    无序       无序      有序
// 2、迭代原型数据    false     true       -
// 3、迭代symbol     true      false      -
// 4、针对人群       Object    Object     可迭代的对象(Array，Map，Set，String...)


// 3、扩展
// 因为数组的typeof 也是 object 所以对于数组而言也是可以使用这个方法的，但是不建议这么操作。
console.log(Object.values([1,"2",object])) // [1，'2'，{....} ]
console.log(Object.entries([1,"2",object])) // [[0,1],[1,'2'],[2,{...}]]




