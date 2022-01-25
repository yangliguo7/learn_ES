/*
 * @description 请注意这里的例子和fileA的区别在于：
 * 不仅只是单单的异步导出，在top await我们也执行了一些异步方法（line 7）。然而在异步导入的时候却有很大的区别
 */
console.log('outputC', 1);

export const outputC = await new Promise((resolve) => {
  // 注意这里可以直接进行await
  setTimeout(() => {
    resolve('outputC');
  }, 0);
});

await new Promise((r) =>
  setTimeout(() => {
    // 这里并没有把这个异步操作当成一个依赖导入，所以这个文件被其他文件导入时，并没有构建出依赖关系
    console.log('outputC耗时操作');
  }, 1000)
);

console.log('outputC', 2);
