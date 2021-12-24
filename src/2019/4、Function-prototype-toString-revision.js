/*
* @description 修改对function toString方法的实现
* @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
*/

// 之前的版本中function toString也是返回的函数的sourceCode

// 比如
function /*这是注释*/ \u0061aaa /*这是注释*/ (/*这是注释*/param1,/*这是注释2*/param2){
    /*这是注释*/
}
// 之前的版本会把某些注释并不会返回原始的code

// 现在使用toString()
console.log(\u0061aaa.toString())// 'function /*这是注释*/  \\u0061aaa /*这是注释*/ (/*这是注释*/param1,/*这是注释2*/param2){\n    /*这是注释*/\n}'


