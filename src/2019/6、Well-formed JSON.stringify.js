/*
 * @description 针对JSON.stringify对unicode的优化
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
 */

// unicode能配对的则返回配对的；否则则进行序列化
// 拿官网的例子举证
// \uD834\uDF06是一个能匹配上的代码片段
JSON.stringify("\uD834\uDF06"); // 𝌆 输出代码
// 无法匹配上的代码则返回序列
JSON.stringify("\uDF06\uD834"); // '"\\udf06\\ud834"'

// 扩展
// 1、JSON
//  1.1、JSON只能用作JSON.parse和JSON.stringify，单独使用并没有意义
//  1.2、JSON 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null

// 2、JSON.parse
// 将满足条件(line 40 -> 46)的字符串转换为json数据
//  2.1 第二个参数reviver; 转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。
//  普通情况下
console.log(JSON.parse(JSON.stringify([1, 2, 3, 4]))); // [1, 2, 3, 4]
//  操作数组
JSON.parse(JSON.stringify(["2", "4", "6", "AAAAA"]), (key, value) => {
  // 这个函数类似于map用于转换每一列
  console.log(key, value); // key为index value为数值
  // 转换的结果需要return出去
  return Number.isNaN(+value) ? value : "BBBB";
}); // [BBBB, BBBB, BBBB, AAAAA]
//  操作数字
JSON.parse(JSON.stringify(2222), (key, value) => {
  console.log(key, value); // key为'' value为数值
  return null;
}); // null
// json是没法解析末尾带逗号(,)的数据 例如
JSON.parse('{"x":1}'); // { x : 1}
JSON.parse('{"x":1},'); // Uncaught SyntaxError: Unexpected token , in JSON at position 7

// 解析的原理
const rx_one = /^[\],:{}\s]*$/;
const rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rx_three =
  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const rx_four = /(?:^|:|,)(?:\s*\[)+/g;
const rx_dangerous =
  /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
// 解析需要上面这个四个正则
// 第一步去解析是否包含这些unicode(rx_dangerous)；将unicode替换或者删除
// 第二步替换字符(rx_two->@ ; rx_three->] ;rx_four -> "" ) 然后与rx_one测试
// 第三步使用eval 计算上面的字符串
// 如果传递了reviver会将上面的eval数据进行函数回调；因此在使用reviver函数之前是有正则校验的；你不能通过reviver函数将越过parse自己的限制。

// 3、JSON.stringify 将json数组转换为字符串
//  3.1 正常情况
JSON.stringify([1, 2, 3]); // "[1, 2, 3]"
//  3.2 额外的参数 replacer、space
//      replacer 序列化操作
//      replacer 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
//               如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
//               如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
JSON.stringify(["a", "B", "d"], (key, value) => {
  console.log("key", key, "value", value); // key  value ["a", "B", "d"]
  return "1"; // '"1"'
});
JSON.stringify({ x: 1, y: 1, z: 2 }, (key, value) => {
  console.log("key", key, "value", value); // key  value { x: 1, y: 1, z: 2 }
  return 1; // '1'
});
JSON.stringify({ x: 1, y: 1, z: 2 }, ["x"]); // '{"x":1}'
JSON.stringify({ x: 1, y: 1, z: 2 }, null); // '{"x":1,"y":1,"z":1}'
//      space   缩进用的空白字符串
//              如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格
//              如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；
//              如果该参数没有提供（或者为 null），将没有空格。
JSON.stringify({ x: 1, y: 1, z: 2 }, null, 10); // '{\n          "x": 1,\n          "y": 1,\n          "z": 2\n}'
JSON.stringify([1, 2, 3], null, 10); // '[\n          1,\n          2,\n          3\n]'
JSON.stringify({ x: 1, y: 1, z: 2 }, ["x", "y"], "字符串"); // '{\n字符串"x": 1,\n字符串"y": 1\n}'
