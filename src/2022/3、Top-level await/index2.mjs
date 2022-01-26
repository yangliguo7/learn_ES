/*
 * @description 这是用来展示top await 不会去阻塞相邻导入模块的问题
 */

console.log('index2', 1);
import { outputC } from './fileC.mjs';
console.log(outputC); // undefined
console.log('index2', 2); // 这里并不会执行

// 和你单独导入fileA是不一样的。
// 因为await会阻塞函数的执行，为了达到尽可能的并行操作，需要明确的指出依赖关系(即异步操作应该当成一个依赖导入)，这样可以使得
// 该并行的文件并行，该异步的文件异步，让尽可能多的工作并行。
// 简单来说就是：需要明确的确认依赖关系，提高并行的可能性
// 例子：

import { outputD } from './fileD.mjs';
console.log(outputD);
