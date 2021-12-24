/*
 * @description 含有迭代器属性的可以转换成对象
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
 */

// Object.fromEntries(iterable) 获取一个对象
// iterable是含有Symbol.iterable的数据，比如Array、map等
console.log([][Symbol.iterator]); // ƒ values() { [native code] }
console.log(new Map()[Symbol.iterator]); //ƒ entries() { [native code] }

console.log(Object.fromEntries([])); // {}
// 如果你使用babel转义这的代码的话；你会发现
//  var callFn = function (value) { // 函数会执行这个函数
//     if (AS_ENTRIES) {
//       anObject(value);
//       return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]); // 这里的value[0]作为key;这里调用toString方法 value[1]作为value; value即每次迭代的数据
//     } return INTERRUPTED ? fn(value, stop) : fn(value);
//   };
// 这就是为什么我们在转换成对象的时候需要是一个数组操作;
console.log(
  Object.fromEntries([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
); // { 1:2,3:4,5:6 } 每一次迭代取到每一个项，第一个作为key 第二个作为value
console.log(Object.fromEntries([[[1, 2, 3], 2]])); // {1,2,3:2} 这里可以看出这里取值用的toString方法
console.log(Object.fromEntries([[{ x: 1, y: 2 }, 2]])); // { [object Object]:2} 这里可以看出toString方法
const tom = {
  x: 1,
  y: 2,
};
console.log(tom.toString()); // '[object Object]'
tom.toString = () => {
  return 1;
};
console.log(tom.toString()); // 1
console.log(Object.fromEntries([[tom, 2]])); //  { 1 : 2 } // 进一步证明了toString方法\
console.log(Object.fromEntries([[1, 2, 3, 4]])); //  { 1 : 2 } 只会取前两位
// 从这个例子可以看出需要使用迭代数据
console.log(Object.fromEntries([1, 2, 3])); // 1不是一个可迭代的数据
console.log(Object.fromEntries([{}, {}, {}])); // {undefined:undefined}  ==> {}[0]是undefined {}[1]是undefined

// map转对象
console.log(Object.fromEntries(new Map([[], [], []]))); // { undefined:undefined } ;
console.log(
  Object.fromEntries(
    new Map([
      [1, 2],
      [3, 4],
    ])
  )
); // { 1:2,3:4 }
console.log(Object.fromEntries(new Map([[[], 1]]))); // { "" : 1 }
console.log(Object.fromEntries(new Map([[{}, 1]]))); // { [object Object]:1}
console.log(Object.fromEntries(new Map([[1, 2, 3]]))); // { 1:2}

// 扩展
// 1、Object.create也可以获取一个对象、二者区别?
// 参数不一样；Object.create参数是一个新创建对象的原型对象;而fromEntries是一个可迭代对象；
