/*
 * @description 对数组扁平化进行操作
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity
 * @link https://tc39.es/ecma262/#sec-multiplicative-operators
 */

// Array.prototype.flat(depth=1) ；拍平数组，注意并不会操作原始数据，会返回一个新数组。
//  depth 深度Num 默认为1
// tips:flat之前叫flatten；将多维数组转换低层级数组；默认拆分一层；
// 如果使用过lodash库的话，对这个一定不会陌生
//  lodash.flatten(array) 减少数组一层深度；
//  lodash.flattenDepth(array, [depth=1]) 减少数组多层深度；
//  lodash.flattenDeep(array) 将数组拍平成一维数组
// 例
let arr = [1, [2], [[3]]];
// 默认一层拍平
console.log(arr.flat()); // [1,2,[3]]
// 多层拍平
console.log(arr.flat(2)); // [1, 2, 3]
// 传入大于深度的层级数
console.log(arr.flat(10000)); // [1, 2, 3]
// 如果需要把全部层级展开。可以转入Infinity
console.log(arr.flat(Infinity)); // [1, 2, 3]
// 传入不正常的层级数；则返回原始数据
console.log(arr.flat(NaN)); // [1,[2],[[3]]]
console.log(arr.flat("String")); // [1,[2],[[3]]]
console.log(arr.flat(-1)); // [1,[2],[[3]]]
// 空数组将会去除
arr = [1, [2], [[3]], []];
console.log(arr.flat()); // [1,2,[3]]

// Array.prototype.flatMap 对数据格式化和拍平；在深度为1与map后flat几乎一样；但是需要注意拍平的层级只会有一层;
// Array.prototype.flatMap((currentValue,[index],[array])=>{
//
// },[thisArg]) // 注意：其实map函数参数也是这样的。
// currentValue --> 当前正在数组中处理的元素
// index --> 数组中正在处理的当前元素的索引(可选)
// array --> 被调用的 map 数组(可选)
// thisArg --> 执行函数的时候this(可选) 默认是undefined
// 例：
let mapArr = [[1], [2], [3]];
// 利用对数据进行map和flat操作
console.log(mapArr.map((item) => item * 2).flat()); // [2,4,6]
// 对数据进行flapMap操作
console.log(mapArr.flatMap((item) => [item * 2])); // [2,4,6] 请注意这里这里 [1] * 2= 2 不是[2]！！！！！
// 在对层级深度为1的数据而言；二者基本没有区别。
// 当层级深度大于1
mapArr = [[[1]], [[2]], [[3]]];
console.log(mapArr.flatMap((item) => [[item * 2]])); // [ [2] , [4] , [6] ] 请注意这里这里 [[1]] * 2 = 2

this.param = {
  x: 1,
  y: 2,
  z: 3,
};
mapArr = [{ x: this.param.x }, { y: this.param.y }, { z: this.param.z }];
// flatMap的其余参数
mapArr.flatMap((currentValue, index, array) => {
  console.log("this", this); // param:{ x:1 , y:2 , z:3 }   我这里是跑在node端的；node端的this和浏览器端的不一致
  console.log("currentValue", currentValue); // { x:1 }...
  console.log("index", index); // 0-1-2.....
  console.log("array", array); // 当前数组
});
// 1、thisArg 将会修改执行callback时this
mapArr.flatMap(
  function (currentValue, index, array) {
    console.log("this", this); // { param: { x: 'x', y: 'y', z: 'z' } }
    console.log("currentValue", currentValue); // { x:1 }... 这里还是源数组的每一项数据
  },
  {
    param: {
      x: "x",
      y: "y",
      z: "z",
    },
  } // 注意，这里的callback不能是箭头函数，因为箭头函数在函数定义的时候已经确认好了this选项；
);
// 2、 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
const lsArr = [1, 2, 3, 4];
lsArr.flatMap((currentValue, index, array) => {
  // 这里的callback只会执行三次；
  if (index === 1) {
    // 删除源数据某一个选项；这里索引对应的数据是空；callback并不会执行
    delete lsArr[2];
  }
  console.log("currentValue", currentValue); // 1 ; 2 ; 4
  console.log("index", index); // 0 ; 1 ; 3
  console.log("array", array); // [1, 2, 3 ,4]; [1, 2, empty, 4] ; [1, 2, empty, 4]
});
// 3、循环中修改数组长度
// flatMap与map一致,循环次数在第一次调用的时候就已经确定了；
let newArr = mapArr.flatMap((currentValue, index, array) => {
  if (index === 1) {
    //
    mapArr.push("新增数据"); // 即使这里往源数据新增数据，但是循环次数是不变的。追加的元素并不会被callback访问
  }
  console.log("currentValue", currentValue); // { x:1 } ; { y: 2 } ; { z: 3 }
  console.log("index", index); // 0 ; 1 ; 2
  console.log("array", array); // [ { x: 1 }, { y: 2 }, { z: 3 } ] ; [ { x: 1 }, { y: 2 }, { z: 3 }, '新增数据' ] ; [ { x: 1 }, { y: 2 }, { z: 3 }, '新增数据' ]
  return [currentValue];
});
console.log(newArr); // [ { x: 1 }, { y: 2 }, { z: 3 } ]

// 需要注意的是：
// 如果在callback中对引用型数据进行修改会改变源数据
mapArr = [{ name: 1 }, { name: 2 }, { name: 3 }];
console.log(
  mapArr.flatMap((item) => {
    item.name++;
    return item;
  })
); // [{ name: 2 }, { name: 3 }, { name: 4 }]
console.log(mapArr); // [{ name: 2 }, { name: 3 }, { name: 4 }]

// 扩展
// 1、什么是Infinity?
// 在上面中我们使用Array.flat(Infinity) 去'无限'拍平自己的数据
// Infinity是全局属性上的一个数值，表示无穷大。Number.POSITIVE_INFINITY与Infinity一致；
// @link https://www.zhihu.com/question/24423421
console.log(Infinity); // Infinity
console.log(Number.MAX_VALUE * 2 === Infinity); // true
console.log(Number.POSITIVE_INFINITY === Infinity); // true
// 需要注意的是 ( 讲道理 这里非常的奇怪)
console.log(Number.POSITIVE_INFINITY * 1); // Infinity 数字除
console.log(Number.POSITIVE_INFINITY * 0); // NaN 为啥不是0?????????
console.log(Number.POSITIVE_INFINITY * NaN); // NaN
console.log(1 / Number.POSITIVE_INFINITY); // 0 任何数除Infinity 都为 0
// 同样除了正无穷大还有-无穷大
console.log(-1 / Number.POSITIVE_INFINITY);
//  1.1 为什么Number.MAX_VALUE + 1 不是Infinity
console.log(Boolean(Infinity === Number.MAX_VALUE + 1)); // false
//  js中int是拿64位的浮点数(其中首位位符号位)表示的；所以最大数位(2^53 - 1) * 2^971；即Number.MAX_VALUE(1.7976931348623157e+308)；而早IEE754中超过(2^54 -1) * 2^970 则为Infinity
//  所以Infinity比Number.MAX_VALUE 大了 2^970 (近乎等于)
console.log(Infinity === Number.MAX_VALUE + Math.pow(2, 970)); // true
console.log(Infinity === Number.MAX_VALUE + Math.pow(2, 969)); // false
console.log(Infinity === Number.MAX_VALUE + Math.pow(2, 970) - 1); // false

// 3、flatMap和map的区别?
//  多个flat哈哈.....

// 3、数组与数字相乘?
//  3.1 为什么 [1] * 2 = 2
//  在es262中两数相乘,步骤：
//      1、先会左右两数进行先eval计算
//      2、；然后调用ToNumber(es262中的方法名称) 对应js为 Number
//      3、如果两边类型不一致则throw TypeError
// 即 [1] * 2 --> Number([1]) * 2 ---> 2
// 同理
console.log("1" * "2"); // 2    Number('1') --> 1
console.log([1, 2, 3] * 2); // NaN  因为 Number([1, 2, 3]) ---> NaN ; NaN * 2 --> NaN

// 4、node和browser端的this区别
// 这是专门的一节 在WIP中回去描述 fixme
