/*
 * @description 可选链?. 可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效
 */

// PS：这个经常能用到

// 之前在使用对象/数组的属性/方法之前需要对对象/数组的属性/方法进行前置校验，校验是否是null或者undefined
// 例如
const noop = (a) => `函数执行  ${a}`;
const x = {
  a: 1,
  b: {
    b1: noop,
  },
};
// 如果你需要执行noop函数 你需要知道x.b是否是undefined；否则函数会执行错误
// 例
if (x.b !== undefined) {
  x.b.b1();
}
// 在使用可选链后
x?.b?.b1?.('1'); // 函数执行1   即先判断x是否是null或者undefined如果是满足条件则直接返回undefined；接着向下判断x.b以此类推
// 如果你有babel进行转义的话 x === null || x === void 0 ? void 0 : (_x$b = x.b) === null || _x$b === void 0 ? void 0 : _x$b.b1();
x?.b?.b2?.('1'); // 返回则是undefined;因为b.b2是undefined函数往下就不会执行了

// 同样你可以使用在数组上去判断数组是否越界
const arr = [1, 2, 3];
if (arr.length > 5) {
  console.log(arr[4]);
}

// 使用可选链；
console.log(arr?.[4]); // undefined
console.log(arr?.[1]); // 2

// 注：
// 可选链并不能用于属性定义或者避免转化错误
// 例
// x?.c = 1  Invalid left-hand side in assignment
// x?.a?.()  x.a is not a function
