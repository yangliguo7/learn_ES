/*
* @description 正则表达式的新增修饰符s
*/

// 基本操作
let reg = /a.+c/g

const reg2 = new RegExp(/a.+c/,'sg') // 区别多了个s的修饰符

const baseStr ='a\nc'

console.log(reg.test(baseStr)) // false
console.log(reg.dotAll) // false

console.log(reg2.test(baseStr)) // true
console.log(reg.dotAll) // true

// 默认情况下
// s表示的是任何一个默认匹配除换行符之外（\n，\r，行分割符，段分割符）的任何单个字符。
// 当设置s的时候则可匹配到上述分割符

reg = /a.+c/sg

console.log(reg.test(baseStr)) // true
console.log(reg.dotAll) // true


