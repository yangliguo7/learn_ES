/*
 * @description 正则命名捕获
 */

// 匹配年月日的正则
const reg = /(\d{4})-(\d{2})-(\d{2})/;

const baseStr = '2021-10-18';

const result = reg.exec(baseStr);
console.log(result); //['2021-10-18','2021','10','18',index: 0,input: '2021-10-18',groups: undefined]

// 如果我们要获取年月日的话，会很麻烦,会有123这种魔术数字不便于理解，并且第0位是字符串本身（2021-10-18）不好理解，并且假设如果有1000W个下标呢。
console.log(`年：${result[1]}，月：${result[2]}，日：${result[3]}`); //年：2021，月：10，日：18

// 因此出现了具名正则捕获,注意这里的groupName不能重复
const regNamed = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const resultNamed = regNamed.exec('2021-10-18');

// 获取年月日
console.log(`年：${resultNamed.groups.year}，月：${resultNamed.groups.month}，日：${resultNamed.groups.day}`); //年：2021，月：10，日：18

// 上面可以用es6解构优化
const {
  groups: { year, month, day },
} = regNamed.exec('2021-10-18');
console.log(`年：${year}，月：${month}，日：${day}`); //年：2021，月：10，日：18

// 进阶语法\k<group>
// \k<group> 表示之前<group>匹配上的数据进行反匹配，类似于正则的编号引用$1，$2

// 先看下$12..
// 注意这边说的特性都是非标准特性，使用前请查看浏览器支持情况（node端支持就不是很好）
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n
console.log(baseStr.replace(reg, '$3-$1-$2')); //18-2021-10
// $1、2、3 表示上面匹配到得数据
reg.exec(baseStr);
console.log(RegExp.$3); //18

// 扩展
// $123.... 表示正则匹配上的数据
// $_ 表示源数据 // 2021-20-18 => input
// $& 表示最后一次匹配到的数据 => lastMatch
// $+ 表示最后一次匹配到的数据 => lastParen
// $` 表示含有最新匹配的左侧子串 => leftContext
// $' 表示含有最新匹配的右侧子串 => rightContext

const testStr = 'a1|a2|a3|a4|a5|';
const testReg = /a\d/g;
testReg.test(testStr);
console.log(RegExp.$_, RegExp.input); // a1|a2|a3|a4|a5|
console.log(RegExp.$1);
console.log(RegExp['$&']);
console.log(RegExp['$+']);
console.log(RegExp['$']);
