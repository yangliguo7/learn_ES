/*
 * @description 获取对象是否有某个属性,比hasOwnProperty更加可靠
 */

// 写在前面

// hasOwnProperty是对象原型上的判断属性是否在对象的原型上，只要继承自object的对象都会继承hasOwnProperty方法
let obj = {
  x: 1,
};
console.log(typeof obj.hasOwnProperty); // function
console.log(obj.hasOwnProperty('x')); // true
console.log(obj.hasOwnProperty('y')); // false
obj = Object.create({});
console.log(typeof obj.hasOwnProperty); // function
// 注意这里如果创建了一个不包含对象原型的数据，则就不会包含这个方法
obj = Object.create(null); // null
console.log(typeof obj.hasOwnProperty); // undefined
// 因此如果你对这种数据调用hasOwnProperty则会抛出异常。因为他并没有继承object原型
try {
  obj.hasOwnProperty('aaaa');
} catch (e) {
  console.log(e); // TypeError: Cannot read properties of null (reading 'hasOwnProperty')
}

// 因为我们是通过对象原型上进行调用函数的，因此我们可以重写这个方法从而出现意向不到的事情
// 例如：
obj = {
  x: 1,
};
console.log(typeof obj.hasOwnProperty); // function
console.log(obj.hasOwnProperty('x')); // true
console.log(obj.hasOwnProperty('y')); // false
Object.defineProperty(obj, 'hasOwnProperty', {
  value: (key) => {
    return `对象不存在这个${key}`;
  },
});
console.log(typeof obj.hasOwnProperty); // function
console.log(obj.hasOwnProperty('x')); // 对象不存在这个x
console.log(obj.hasOwnProperty('y')); // 对象不存在这个y
// 这是一个重写原型的方法，因此这是不符合预期的，如果此时需要去正确调用得需要这样去
console.log(Object.hasOwnProperty.call(obj, 'x')); // true
console.log(Object.hasOwnProperty.call(obj, 'y')); // false

// ps这个方法会忽略从原型上继承的属性，下面在说到与in的区别的时候会说到

// 因此为了解决这个问题，直接在Object上定义了一个新的方法hasOwn去获取属性是否在对象上。
// 例：
obj = {
  x: 1,
};
console.log(Object.hasOwn(obj, 'x')); // true
console.log(Object.hasOwn(obj, 'y')); // false
// 让我们来to上面解决不了的问题
// 1、对于没继承Object的对象
obj = Object.create(null);
Object.hasOwn(obj, 'x'); // false // 并不会报错
// 当然如果你传入非对象类型也会抛出异常
try {
  Object.hasOwn(null, 'x');
} catch (e) {
  console.log(e); // Cannot convert undefined or null to object
}
// 2、因为是直接通过Object去使用，所以并不存在原型重写从而发生意向不到的情况
obj = Object.create({ x: 1 });
console.log(obj.hasOwn); // undefined

// 当然和hasOwnProperty一样，他会忽略从原型上继承的属性!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(obj.hasOwnProperty('hasOwnProperty')); // false hasOwnProperty是从Object原型上继承而来的
console.log(Object.hasOwnProperty(obj, 'hasOwnProperty')); // false
const father = {
  a: 1,
  b: () => {},
};
const child = Object.create(father); // {}
console.log(child.a); // 1
console.log(child.b); // [ Function b ]
console.log(child.hasOwnProperty('a')); // false
console.log(Object.hasOwn(child, 'a')); // false

// babel后你会发现 hasOwn其实也是调用的hasOwnProperty
// module.exports = Object.hasOwn || function hasOwn(it, key) {
//   return hasOwnProperty.call(toObject(it), key);
// };

// 扩展
// in、hasOwnProperty、hasOwn的区别
// hasOwn是对hasOwnProperty的增强版本，解决了非继承Object原型类的数据使用hasOwnProperty抛出异常问题，hasOwn是Object的方法，不会出现对象重写原型链而导致异常情况的产生
// in 也是判断对象是是否包含某个属性，但是他可以判断对象原型上的属性
console.log('a' in child); // true
