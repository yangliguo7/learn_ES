/*
 * @description 正则匹配指数
 */

// 在正则中新增修饰符 d 来获取每次被匹配到的数据
// 因为性能上的考虑、在使用d修饰符后，执行结果可调用indices来获取匹配的字符串在原字符串的起始结束位置

const str = 'a2c3d4';
str.match(/\d\D/); // 2c
let result = str.match(/\d\D/d);
console.log(result);
// [
//  '2c',
//  index: 1,
//  input: 'a2c3d4',
//  groups: undefined,
//  indices: [ [ 1, 3 ], groups: undefined ]
// ]

console.log(result.indices); // [ [ 1, 3 ], groups: undefined ]
str.slice(1, 3); // 2c 即匹配到的字符串
// 返回参数表示正则捕获的位置 即 2c 在原始字符串的起始终止位置
// 返回数组的个数是不确定的，根据正则捕获的具体内容来返回数组里内容的个数

// 例如
result = str.match(/\d(\D)/d);
console.log(result.indices); // [ [ 1, 3 ], [ 2, 3 ], groups: undefined ]
// 其中 数组第一项表示\d(\D)整个正则捕获内容在原数据的起始结束位置，第二项表示(\D)捕获内容在原数据的起始结束位置
// 在比如
result = str.match(/\d(\D(\d(\D)))/d);
console.log(result.indices); // [ [ 1, 5 ], [ 2, 5 ], [ 3, 5 ], [ 4, 5 ], groups: undefined ]
// 其中 [ 1, 5 ]对应\d(\D(\d(\D)))
//     [ 2, 5 ]对应(\D(\d(\D)))
//     [ 3, 5 ]对应(\d(\D)以此类推
console.log(result.indices[0]); // [ 1, 5 ]

// 同时可以获取正则匹配组的数据;在未匹配组数据则是undefined
// 例如
result = str.match(/\d(?<name>\D)\d/d);
console.log(result.indices); // [ [ 1, 4 ], [ 2, 3 ], groups:  { name: [ 2, 3 ] } ]
console.log(result.indices.groups) // { name: [ 2, 3 ] }

// 注意
// 1、当你配上全局标识符g则无法正常工作
result = str.match(/\d\D/dg); // [ '2c', '3d' ]
console.log(result.indices) // undefined
// 2、同样使用于exec
RegExp(/\d\D/d).exec(str)
// [
//     '2c',
//     index: 1,
//     input: 'a2c3d4',
//     groups: undefined,
//     indices: [ [ 1, 3 ], groups: undefined ]
// ]
RegExp(/\d\D/d).exec(str).indices // [ [ 1, 3 ], groups: undefined ]

