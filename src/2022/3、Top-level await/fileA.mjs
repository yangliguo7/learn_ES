export const outputA = await new Promise((resolve) => {
  // 注意这里可以直接进行await
  setTimeout(() => {
    resolve('outputA');
  }, 2000);
});
