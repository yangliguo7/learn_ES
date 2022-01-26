export const getData = (a) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a ** a);
    }, 1000);
  });
};
