/*
 * @description 动态导入
 */
// 之前的版本中 import都是静态导入，即在运行前就已经确定了依赖关系,所有被导入的模块，在加载时就被编译.
// 但是在某些场景下，比如降级操作，或者根据运行环境需要导入不同的数据，动态import、按需加载等是非常有用的

let result;
if (Math.random() < 0.5) {
  result = import('./A.mjs');
} else {
  result = import('./B.mjs');
}
result.then((resp) => {
  console.log('1', resp); // 你会发现这里的数据是实时变化的
});

// 或者
const fileName = Math.random() < 0.5 ? 'A' : 'B';
result = import(`./${fileName}.js`);
result.then((resp) => {
  console.log('2', resp); // 你会发现这里的数据是实时变化的
});

// 这种函数调用将会返回一个promise
// 当然你也可以使用await来阻塞执行
(async () => {
  // 立即调用
  result = await import(`./${fileName}.js`);
  console.log('3', result);
})();

// 扩展
// 在es2022中；作用域可以拥有Top-level await，你可以直接写成 result = await import('./B.js');而不再需要使用立即执行函数去await
// 见文件夹 2022 Top-level await

// 注意：
// 请不要滥用动态导入（只有在必要情况下采用）。静态框架能更好的初始化依赖，而且更有利于静态分析工具和tree shaking发挥作用
