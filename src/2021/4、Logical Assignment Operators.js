/*
 * @description 逻辑赋值运算符
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E7%AC%A6
 */

// 将逻辑运算符与赋值运算符相结合 ||= &&= ??=
// 逻辑运算符 || && ?? !

// 例如
// ??= 当左边的false则赋值
(() => {
  let a = undefined;
  // 对a设置默认值
  a ||= '2'; // a 就变成了 2 ; ===> a || (a = '2');
  console.log(a);
  // if (a) { 即等同于上面的写法
  //   a = 2;
  // }
})();
// 在对对象操作时
(() => {
  let x = {
    x: '',
    y: '1',
    z: '1',
  };

  Object.defineProperties(x, {
    y: {
      get() {
        console.log('y get触发了一次');
        return 1;
      },
      set(a) {
        console.log('y set触发了一次', a);
        return a;
      },
    },
    z: {
      get() {
        console.log('z get触发了一次');
        return 1;
      },
      set(a) {
        console.log('z set触发了一次', a);
        return a;
      },
    },
  });

  // 对x.x设置默认值
  x.x ||= 1; // { x:1 }

  // 除了设置默认值外，在触发对象的函数上这种写法也会有区别
  x.y = x.y || '2'; // 这种写法，get set会分别触发一次，因为即使x.y为true也会进行赋值操作
  x.z ||= '2'; // 这里 set并不会去执行  ===> x.z || (x.z = '2');
})();

// 除了??= 还有&&=

// ??= 当左边为undefined或者null则赋值
// ?? 是2020新增特性，见文件夹2020/Nullish coalescing Operator
(() => {
  let x = null;
  x ??= 1;
  console.log(x); // 1
  x = '';
  x ??= 2;
  console.log(x); // ''
})();

// &&= 当左边为true则赋值
(() => {
  let x = null;
  x &&= 1;
  console.log(x); // null
  x = '';
  x &&= 2;
  console.log(x); // ''
  x = true;
  x &&= '123';
  console.log(x); // 123
})();
