/*
 * @description 这个文件是示例 top await 并不会阻塞相邻模块，对于异步的操作需要明确指示依赖关系,是对fileC的正确写法
 */

console.log('outputD', 1);
import { outputA } from './fileA.mjs';

export const outputD = await new Promise((resolve) => {
  // 注意这里可以直接进行await
  setTimeout(() => {
    console.log(outputA);
    console.log('outputD耗时操作');
    resolve('outputD耗时操作');
  }, 0);
});

console.log('outputD', 2);
