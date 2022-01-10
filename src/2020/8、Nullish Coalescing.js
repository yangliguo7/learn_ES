/*
 * @description 空值合并运算符 ??
 */

// 在可选链中?. 是对null或者undefined进行操作；但是在js中Boolean(0) Boolean('') 都是false。在这前提下?.就不满足了

// 例如
const x = {
  empty: '',
  zero: 0,
  null: null,
  NaN: NaN,
  undefined: undefined,
  correct: 'AAAA',
};
const fn = () => {
  console.log('函数执行');
  return '函数执行';
};

// 或运算当左侧为false是就会执行右侧函数，而Boolean(0， ''， NaN， null， undefined)都为false。
// 下面的函数都会执行因为左侧为false
x.null || fn();
x.undefined || fn();
x.empty || fn();
x.zero || fn();
x.NaN || fn();

// 而在某些场景下我们只想在null和undefined才会进行操作；类比与可选链。所以引入了新的api 合并空值运算??
x.null ?? fn(); // 这里函数会执行
x.undefined ?? fn(); // 这里函数会执行
// 但是
x.empty ?? fn(); // 不会执行,因为左侧不是null或者undefined所以不会执行到函数
x.zero ?? fn(); // 不会执行,因为左侧不是null或者undefined所以不会执行到函数
// 使用babel进行转义
// (_x$zero = x.zero) !== null && _x$zero !== void 0 ? _x$zero : fn(); 即左侧不是null或者undefined才会执行右侧

// 通常你也可以用于赋值操作；进行默认值赋值
// 例如
const a = x.null ?? fn(); // '函数执行'
const b = x.undefined ?? fn(); // '函数执行'
const c = x.empty ?? fn(); // ''
const d = x.zero ?? fn(); // 0
const e = x.NaN ?? fn(); // NaN
console.log(a, b, c, d, e); // 函数执行 函数执行 '' 0 NanN

// 也可以用作逻辑空赋值 ??=
// 见文件夹2021/proposal-logical-assignment
