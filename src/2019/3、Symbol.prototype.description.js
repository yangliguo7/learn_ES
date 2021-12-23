/*
 * @description 新增symbol获取描述
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 */

const symbol = Symbol("这是描述");

symbol.toString(); // 'Symbol(这是描述)'

console.log(symbol.description); // 这是描述

// 扩展
// 1、什么是Symbol?
// symbol是一个新的基本数据类型，他用做对象的修饰符号，表示唯一不可变的数值，在js内置对象经常可以看到。
// Symbol不支持new，它具有静态属性和静态方法。每个Symbol都是不同的，他用做对象属性的描述符号。

// 当我们需要表示一个唯一的id
let id = Symbol(); // 修饰符是可选的。
console.log(id); // Symbol()

// 因为symbol表示的独一无二的数据
console.log(Symbol() === Symbol()); // false
console.log(Symbol("这是修饰符") === "这是修饰符"); // false

// 2.Symbol也可以用作对象的key
let obj = {
  [id]: "这是symbol",
};
console.log(obj[id]); // 这是symbol
// 注意这里不能是obj.id 因为obj.xx 会把xx当成字符串处理
// 例如
obj = {
  [id]: "这是symbol",
  id: "这是id",
};
console.log(obj[id]); // 这是symbol
console.log(obj.id); // 这是id

// 3. Symbol的修饰符
id = Symbol("这是修饰符");
console.log(id.toString()); // "Symbol("这是修饰符")"
console.log(id.description); // "这是修饰符"

// 4、全局作用域 Symbol.for
// Symbol.for会将symbol可以放置在一个全局的作用域中，AB两个页Symbol将会共享。单独调用Symbol并不是注册在全局的注册表中
// Symbol.for先查看全局有没有这个symbol，有则返回这个，没有则创建这个。
// 例如：
const scopeSymbol = Symbol("全局作用域");
const globalSymbol = Symbol.for("全局作用域"); // 先会查看全局有没有，没有则新建一个全局的
console.log(scopeSymbol === globalSymbol); // false
const globalSymbol2 = Symbol.for("全局作用域"); // 这里会返回上面的那个全局symbol
console.log(globalSymbol === globalSymbol2);
// 全局查找symbol Symbol.keyFor
console.log(Symbol.keyFor(globalSymbol)); // 全局作用域 --> 返回的是描述信息
// 如果全局查不到则返回undefined
console.log(Symbol.keyFor(scopeSymbol)); //undefined
console.log(Symbol.keyFor(globalSymbol2)); // 全局作用域
// 值得注意的是 这里传入的是symbol而不是描述

// 5、重点!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Symbol是在ES6/ES2015提出的，那么他的实际应用场景呢?
// 现在js内部代码都是基于Symbol做操作的，比如迭代器、循环遍历，instanceof所以有时候我们在实现自己自定义的类或者对象可以进行扩展

// 例：
// 处理迭代器
const myIterable = {
  x: "这是一个数据",
};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield "随机数据";
  yield 3;
};
console.log([...myIterable]); // [1, '随机数据', 3]会发现和自身数据没关系，这里已经重写了迭代方法

// 处理instanceof
myIterable[Symbol.hasInstance] = (instance) => {
  console.log(instance);
  return instance > 5;
};
console.log(1 instanceof myIterable); // false
console.log(10 instanceof myIterable); // true

// 上面只是简单介绍下，具体可以看MDN文档；
