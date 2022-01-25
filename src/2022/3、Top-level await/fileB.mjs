export const outputB = await new Promise((resolve) => {
  setTimeout(() => {
    resolve('outputB');
  }, 1000);
});
