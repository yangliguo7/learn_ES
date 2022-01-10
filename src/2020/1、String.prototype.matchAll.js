/*
 * @description 获取正则表达式所有匹配的结果及分组捕获组的迭代器
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
 * @link https://github.com/tc39/proposal-string-matchall/blob/main/spec.md
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators
 */

// 例
const regex = /t(e)(?<g1>st(?<g2>\d?))/g;
const scopeRegex = /t(e)(?<g1>st(?<g2>\d?))/;
const string = 'test1test2';

// 普通匹配；从左往右匹配一次并会返回捕获组数据
string.match(scopeRegex); // [0: "test1",1: "e",2: "st1",3: "1",groups:[g1: "st1",g2: "1"],index: 0,input: "test1test2"]
// 全局匹配；但是这种获取不到当前匹配的组内容
string.match(regex); // ["test1"，"test1"]

// 因此，matchAll就是为了解决这种问题，获取正则表达式所有匹配的结果及分组捕获组的迭代器 ;
const iterator = string.matchAll(regex); // 该函数返回的是一个迭代器；
// 获取迭代器内容
console.log([...string.matchAll(regex)]); //  [ [0: "test1",1: "e",2: "st1",3: "1",groups:[g1: "st1",g2: "1"],index: 0,input: "test1test2"],[0: "test2",1: "e",2: "st2",3: "2",groups:[g1: "st2",g2: "2"],index: 0,input: "test1test2"] ]
// 通过调用next可以一步一步获取迭代内容
console.log(iterator.next()); // { value:[0: "test1",1: "e",2: "st1",3: "1",groups:[g1: "st1",g2: "1"],index: 0,input: "test1test2"],done:false }
console.log(iterator.next()); // { value:[0: "test2",1: "e",2: "st2",3: "2",groups:[g1: "st2",g2: "2"],index: 0,input: "test1test2"],done:true  }
// 注意这个时候如果你通过 [...iterator]将不会在获取到数据；因为展开语法也是迭代器遍历,上面已经done:true了
console.log([...iterator]); // []

// 注意：
// matchAll对应的正则对象对象需要是/g (全局匹配不然会报错)
console.log(string.matchAll(scopeRegex)); // Uncaught TypeError: String.prototype.matchAll called with a non-global RegExp argument
