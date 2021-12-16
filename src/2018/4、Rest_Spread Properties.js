/*
 * @description 扩展运算符
 * @link https://tc39.es/proposal-object-rest-spread/
 */

// 之前的版本扩展运算符是对于数组操作的，所以这个提案是把功能扩展为同样适用于对象操作
const arr1 = [1, 2, 3];
const set = new Set();
set.add({});
set.add(null);
set.add(undefined);
set.add(() => {});
const arr2 = ['A', ...arr1, ...set, 'b']; // A,1,2,3,{},null,undefined,()=>{}
arr1.push('aaaaaaa');
console.log(arr2); // 数据是复制到一个新的对象 A,1,2,3,{},null,undefined,()=>{}

// 操作对象
const a = {
  1: 1,
  2: 2,
  null: null,
  undefined: undefined,
  loop: {
    loop1: '1',
  },
};

// { 1: 1,
// 2: 2,
// loop: {loop1: '1'},
// null: null,
// undefined: undefined }
const b = { ...a }; // 类比于Object.assign
let c = { 1: 2, ...a }; // 1 会被 a的值覆盖
// 同理
c = { ...a, 1: 2 }; // 1 为 2
// 对于子对象是覆盖而不是合并
c = {
  ...a,
  loop: {
    loop2: '1',
  },
}; // { 1: 1, 2: 2, loop: {loop2: '1'}, null: null, undefined: undefined}

// 同样可以用作数据结构
const { a: name, ...l } = { a: 1, b: 2, c: 2 };
console.log(name); // { a : 1 }
console.log(l); // { b: 2 , c: 2 } // 注意这是对象并不是数组

// 注意
// 扩展运算符必须在最后一位
const { ...l2,a: name2  } = { a: 1, b: 2, c: 2 };  // -> Rest element must be last element
console.log(l2)
console.log(name2)



