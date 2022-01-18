/*
 * @description Promise.any接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise。只有全部失败才会返回失败
 */

// 相比较于Promise.all需要可迭代对象全部成功才算成功,Promise.any只要一个成功即会返回。这一点与all相反

const sP = (a, time = 1000) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(a);
    }, time)
  );
};

const eP = (a, time = 1000) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      reject(new Error(a));
    }, time)
  );
};

// 普通例子
Promise.any([sP(1), eP(2)])
  .then(
    (resp) => {
      console.log(resp); // 1 执行
    },
    (reject) => {
      console.log(reject); // 这里并不会执行；因为可迭代对象并没有全部失败
    }
  )
  .catch((e) => {
    console.log(e); // 这里并不会执行；因为可迭代对象并没有全部失败
  });

// Promise.any 会返回最先成功的数据
Promise.any([sP('执行2s', 2000), eP(2), sP('执行3s', 3000)]).then((resp) => {
  console.log(resp); // 执行2s 只要有一个返回成功则返回成功的结果，此例中2s比3s成功返回的块，所以先返回
});

// 只有当可迭代的对象全部失败才会失败
Promise.any([eP('执行1s'), eP('执行2s', 2000)])
  .then((resp) => {
    console.log(resp); // 这里不会有输出
  })
  .catch((error) => {
    console.log(error); // All of the promises were rejected.
  });

// 上面的也可以写成
Promise.any([eP('执行1s'), eP('执行2s', 2000)]).then(
  (resp) => {
    console.log(resp); // 这里不会有输出
  },
  (error) => {
    console.log(error); // All of the promises were rejected.
  }
);
// 使用try catch捕获异常
(async () => {
  try {
    await Promise.any([eP('执行1s'), eP('执行2s', 2000)]);
  } catch (error) {
    console.log(error); // All of the promises were rejected.
  }
})();

// 扩展
// 1、与其他promise的区别
// 查看文件夹2020/Promise.allSettled
