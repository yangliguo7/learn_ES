/*
 * @description 定义for in的顺序
 * @link https://javascript.info/object#the-for-in-loop
 * @link https://github.com/tc39/proposal-for-in-order
 */

// 定义for in的顺序 先看结论
// The short answer is: “ordered in a special fashion”: integer properties are sorted, others appear in creation order. The details follow.
// 翻译一下就行：先按照整数属性的数字顺序进行排列(按位比较 小的在前)，然后按新增数据排列。注意在这了'+1'/'0.1'并不算真正意义的数字属性。因为Number(+1) = 1而1不是+1前后长的不一样。

// 例子
const x = {
  z: 'z',
  a: 'a',
};
for (const x1 in x) {
  console.log(x1); // z -> a 按照新增顺序排序
}
// 新增非数字属性
x.b = 'b';
for (const x1 in x) {
  console.log(x1); // z -> a —> b 按照新增顺序排序
}
// 但是如果属性的键是数字
x[1] = 1;
for (const x1 in x) {
  console.log(x1); // 1-> z -> a —> b 整数数字在前
}
// 数字会按照按位比较，小的在前面
x[212313131] = 212313131;
for (const x1 in x) {
  console.log(x1); // 1->212313131-> z -> a —> b 因为第一位1<2
}
x[13] = 13;
x[12] = 12; // 12 虽然新增顺序落后于 13 但是迭代顺序会在前因为第二位的值 2 < 3
for (const x1 in x) {
  console.log(x1); // 1-> 12 -> 13 -> 212313131 -> z -> a —> b
}
x['10'] = 'string 10'; // Number('10') = 10 前后一样
for (const x1 in x) {
  console.log(x1); // 1-> 10 -> 12 -> 13 -> 212313131 -> z -> a —> b
}
// 如果新增非整数数字则会按照新增属性排序
x['+12'] = '+12'; // Number('+12') = 12 前后不一样
for (const x1 in x) {
  console.log(x1); // 1-> 12 -> 13 -> 212313131 -> z -> a —> b -> +12
}
x[1.2] = '1.2'; // Number(1.2) = 1 前后不一样
for (const x1 in x) {
  console.log(x1); // 1-> 12 -> 13 -> 212313131 -> z -> a —> b -> +12 -> 1.2
}

// 同样适用于以下几种顺序，因为他们采用的是一样的算法
// Object.keys
// Object.values
// Object.entries
// JSON.parse
// JSON.stringify
