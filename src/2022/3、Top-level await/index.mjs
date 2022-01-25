/*
 * @description await可以不包含在async中
 */

const p1 = (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(num);
      resolve(num);
    }, 1000);
  });
};

// 之前我们使用解决异步问题需要借助await和async，但是await需要和async一起使用
// 例如
(async () => {
  await p1(1); // 1
})();

// 在新的提案中我们可以在模块最高级使用await
// 例如
await p1(2); // 这里就可以直接使用await

// 我们可以利用这个去解决什么问题呢
// 1、模块的异步导入导出；在fileA(2s)和fileB(1s)中都有耗时的导出
import { outputB } from './fileB.mjs';
console.log(outputB); // outputB
import { outputA } from './fileA.mjs';
console.log(outputA); // outputA
console.log('---分割线----');
// 你会发现先输出的outputB在输出的outputA，尽管outputB更加的耗时
// 你可以把他粗略的理解为这样
// import { promiseB, outputB } from './fileB.mjs';
// import { promiseA, outputA } from './fileA.mjs';
// promise.allSettled([promiseB,promiseA]).then(()=>{.......})
// 这里只是简单理解，真实情况是执行是以postorder顺序执行，没有top await的模块会同步运行，具有top await的模块在执行完毕后会通知与他相关的依赖项进行同步操作，注意你动态的import语句也算是异步操作

// 注意!!!!!!!!!!!!!!!!!!!!!!!!!
// 1、top wait不会去阻碍相邻模块的导入
// 例如：
// 如果在fileA.mjs或者fileB.mjs也有一些耗时的操作,例如fileC.mjs
// 请移步index2.mjs

// 注意
