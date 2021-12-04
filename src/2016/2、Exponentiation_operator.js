/*
 * @description 指数操作
 * @link https://github.com/tc39/proposal-exponentiation-operator
 * @year 2016
 */

const baseValue  = 2

// -> 2*2*2 2的三次方
console.log(baseValue ** 3) // 8

// -> 1 / 2*2*2 2的三次方之一
console.log(baseValue ** -3) // 1/8

// 指数也可以为字符串
console.log(baseValue**-3===baseValue**"-3") // true

// 无法转换则为NAN
console.log(baseValue ** "abc") //NAN

// 超过最大值为Infinity 这个最大值是Number.MAX_VALUE 不是 Number.MAX_SAFE_INTEGER(2**53 -1)
console.log(Number.MAX_SAFE_INTEGER ** Number.MAX_SAFE_INTEGER) // Infinity

// 扩展
let mixin  = 2
mixin **= baseValue // mixin = mixin ** baseValue 4
