/*
* @description 填充字符串
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
* @year 2017
*/

/**
 * @description 用一个字符串填充当前字符串,直到达到targetLength长度
 * @param {Number} targetLength 目标长度
 * @param {String} [padString] 填充字符串，缺省值为" "。会将你传入的数据字符话
 * @return {String} 填充后的数据
 */
// str.padEnd(targetLength [, padString])

const baseStr ="12345"

// 基本操作
console.log(baseStr.padStart(6)) // 12345
console.log(baseStr.padEnd(6))   //12345
console.log(baseStr.padStart(10,"我"))   //我我我我我12345
console.log(baseStr.padEnd(10,"我"))   //12345我我我我我

// 如果targetLength的长度短于baseStr
console.log(baseStr.padStart(1)) //12345
console.log(baseStr.padStart(1,'这是字符串')) //12345

// 扩展
// targetLength会转换成number行，如果无法转换则不发生改变
// padString会转换为字符
console.log(baseStr.padStart("6","我")) //我我我我我12345
console.log(baseStr.padStart(6,()=>{})) //12345(
console.log(baseStr.padStart("我","我")) //12345




