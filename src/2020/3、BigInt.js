/*
 * @description 表示任意精度的整数 BigInt
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 * @link https://docs.google.com/presentation/d/1apPbAiv_-mJF35P31IjaII8UA6TwSynCA_zhfDEmgOE/edit#slide=id.p
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 */
// 基本使用
// 1、整数后面加n
let num1 = 1n;
// 2、使用BigInt构造 没法使用new
num1 = BigInt(2n);
num1 = BigInt('2'); // 其他类型并不能转化成BigInt
num1 = BigInt('0x11'); // 17n 16进制
num1 = BigInt('0b1111'); // 15n 2进制 其他类型并不能转化成BigInt
try {
  num1 = BigInt(0.5);
} catch {
  // The number 0.5 cannot be converted to a BigInt because it is not an integer
  // 写在前面，需要注意的是，这里表示的都是 整!!!! 数
}

// 数据类型
console.log(typeof num1); // bigint

// 注意事项
// 1、BigInt和Number类似可以使用 +、*、-、**、%、除>>>之外的位操作。不能使用Math的方法、无法与Number进行混合运算。
console.log(1n + 1n); // 2n
console.log(1n * 2n); // 2n
console.log(2n ** 2n); // 4n ** 表示次方
try {
  console.log(1n + 1); // Cannot mix BigInt and other types, use explicit conversions
  console.log(+1n); // 注意这并不能转成number
} catch {}
console.log(9n / 10n); // 0n 做除法运算的时候需要注意的是,会丢失精度，并且是向下取整，带小数的运算会被取整。。
console.log(++num1); // 16n
// 大小比较
console.log(2 <= 3n); // true
console.log(1n <= 1); // true
console.log(1n === 1); // false 需要注意BigInt 和 Number 不是严格相等的，但是宽松相等的。
console.log(1n == 1); // true

// 2、静态方法
// fixme 待定
// 3、实例方法
//  toString 返回基元值对应的指定数字
console.log((BigInt(Number.MAX_SAFE_INTEGER) + 1n).toString()); // 9007199254740992
console.log('1' + BigInt(2n)); // '12'
// 需要注意通过String在转换成Number可能会都是精度
console.log(Number.MAX_VALUE === Number((BigInt(Number.MAX_VALUE) + 1n).toString())); // true
//  valueOf 返回基元值
console.log((BigInt(Number.MAX_SAFE_INTEGER) + 1n).valueOf()); // 9007199254740992n
//  toLocaleString 返回 language-sensitive 形式的字符串 类似于Number.toLocaleString
console.log((BigInt(Number.MAX_SAFE_INTEGER) + 1n).toLocaleString()); // 9,007,199,254,740,992

// 注：
// json中并不能使用BigInt
try {
  JSON.stringify(1n);
  JSON.parse('{"x":1n}');
} catch {
  // 上面的操作都是错误的
  // 可以自行实现toJSON方法
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  JSON.stringify(1n); // '"1"'
}

// 扩展
// 1、为什么Number.MAX_SAFE_INTEGER位为2^53-1?
//    首先需要明确的是，为什么最大安全整数是2^53-1而不是2^53。这是因为2^53和2^53+1和2^53+2都是一样的内存表示。任何超过这个数的运算都是不安全的。其次为什么是53是因为根据IEEE754实现标准
//    小数位是53位
// 2、为什么Number.MAX_VALUE为1.7976931348623157e+308?
//    js中的Number是64位的浮点数，根据IEEE 754实现标准，其中1位位符号位，11为指数位，53为小数位。任何一个浮点数科表示为 -1^s * M * 2^e；s为符号位数0正1负,M为1到2之前的数，E为指数位。
//    前面11为全为1则为infinite；所以最大数应该是10个整数1 加上52个小数位1，即 E为2^10+.....2^1--->2046 小数位 2^(2046-1023)+.....2^(2046-1023-52)  根据等比公式求和可得 (2^53-1)* 2^971
//    即1.7976931348623157e+308
