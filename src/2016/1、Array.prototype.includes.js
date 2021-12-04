/*
 * @description 数组includes特性
 * @MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 * @year 2016
 */

/**
 * @description 判断数组是否包含某个数据
 * @param {any} valueToFind 期待查询到的数值，(字符串区分大小写)
 * @param {Number} [fromIndex] 从第几位开始默认为0位,如果负数则从arr.length+fromIndex开始(简单来说就是从倒数第几位向后找)
 * @return {Boolean} valueToFind是否存在arr中,true为包含
 */
// arr.includes(valueToFind[, fromIndex])

const arr = [1,2,3,'ABC']
arr.includes(3) // true
arr.includes('3') // false
arr.includes('ABC') // true
arr.includes('abc') // false
arr.includes(3,0) // true
arr.includes(3,3) // false
arr.includes(3,-1) // false
arr.includes(3,-2) // false 从倒数第二位查到最后一位

// 对标类数组
// 类数组无法使用只针对数组操作
const set = new Set(arr)
set.includes(3)  // set.includes is not a function

