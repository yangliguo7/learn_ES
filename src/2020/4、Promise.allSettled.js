/*
 * @description promise新的特性，不会短路的api
 */

// 写在前面 Settled为稳定的意思
// Promise.allSettled返回一个在 所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。
// 他并不会因为一个fulfilled或者rejected而结束。
// Promise.allSettled(iterable); 参数为一个可以迭代的数据,且每一个对象为promise;
// 对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。value（或 reason ）反映了每个 promise 决议（或拒绝）的值。

// 例如
// 模拟一次成功一次异常的异步请求
const resolve = (time = 0, secret = false) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (secret) {
        console.log(`正确日志${time}`);
      }
      resolve(time);
    }, time * 1000)
  );
};
const reject = (time = 0, secret = false) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (secret) {
        console.log(`错误日志${time}`);
      }
      reject(`错误了${time}`);
    }, time * 1000)
  );
};
// 模拟异常
const error = new Promise((resolve, reject) => {
  throw new Error(111);
});
// 模拟忘记设置状态
const common = new Promise((resolve, reject) => {
  // 什么操作也不做
});

//  1、正常情况
//  Promise 不会因为其中一个fulfilled或者rejected而中断操作；并且函数的返回结果顺序也是入参的顺序!!!
Promise.allSettled([resolve(2), reject(1)]).then(
  (resp) => {
    console.log(`Promise.allSettled ${resp}`); // [ { status: 'fulfilled', value: 2 }, { status: 'rejected', reason: '错误了1' } ]
  },
  (reject) => {
    console.log('Promise.allSettled reject', reject); // 未执行
  }
);
//  2、若某一个发生异常
//  注意 即使函数抛出异常catch函数并不会捕获到错误，
Promise.allSettled([resolve(2), reject(1), error])
  .then(
    (resp) => {
      console.log(`Promise.allSettled ${resp}`); // [ { status: 'fulfilled', value: 2 }, { status: 'rejected', reason: '错误了1' }, { status: 'rejected', Error: 111} ]
    },
    (reject) => {
      console.log('Promise.allSettled reject', reject); // 未执行
    }
  )
  .catch((e) => {
    console.log(`异常为`, e); // 未执行
  });
//  3、若某一个未正确返回状态
//  注意allSettled中的每一项需要触发promise状态。因为allSettled会去等待所有promise执行完成才会去执行then方法
Promise.allSettled([resolve(2), reject(1), error, common]).then((resp) => {
  console.log(`Promise.allSettled 这里执行了吗 resp`); // 函数未执行
});

// 扩展
// 对比promise其他API
// 先说结论
// 相同点：参数都是包含promise迭代数组，返回的数据也是迭代数组。如果传入的不是promise迭代数组，例如[1,2]则promise直接fulfilled 返回结果也是数组
//  | name                | 用途                                                         | 特性
//  | Promise.allSettled  | 用于返回所有的promise执行情况,当所有promise执行完毕后统一返回结果 | 不会因为promise执行成功或失败而终止
//  | Promise.all         | 用于返回所有的promise执行情况,当所有promise执行完毕后统一返回结果 | 只要有一个promise执行失败则终止
//  | Promise.race        | 用于返回最快有结果的promise执行情况                             | 只要迭代数据里有一个Settled(fulfilled/rejected)则终止
//  | Promise.any         | 用于返回最快fulfilled的promise执行情况                         | 只要迭代数据里有一个fulfilled则终止

// 注意事项：
// 1、需要注意的是当参数是promise数组时候，会等待promise的状态，而参数是不是promise的迭代数据则直接fulfilled
// 2、注意每个API有不同的使用场景，根据场景来使用不用的api




// 例子：
// 1、Promise.all
// Promise.all 所有promise fulfilled才会去执行then，会因为其中一个rejected而中断执行执行catch。并且需要注意的是函数的返回结果顺序也是入参的顺序
//  1.1 正常情况
Promise.all([resolve(2), resolve(1)]).then((resp) => {
  console.log(`Promise.all ${resp}`); // [2,1],函数的返回结果顺序也是入参的顺序无论函数执行时间
});
//  1.2 若一个发生异常
Promise.all([resolve(2, true), reject(3, true), resolve(1, true), resolve(10, true)])
  .then(
    (resp) => {
      console.log(`Promise.all ${resp}`); // 这里并不会执行；因为参数数组中某一个函数reject了
    },
    (reject) => {
      console.log(`Promise.all reject ${reject}`); // Promise.all reject 3
    }
  )
  .catch((e) => {
    console.log(`Promise.all 发生异常 ${e}`); // 需要注意的是，如果异常在前面被捕获了,这里则不会在执行了
  });

//  1.3 若某一个函数未正确返回状态，同上都不会执行，因为Promise.all需要等待参数每一项的状态
Promise.all([resolve(2), common])
  .then((resp) => {
    console.log(`Promise.all 这里执行了吗? ${resp}`); // 不会执行
  })
  .catch((e) => {
    console.log('这里异常执行了吗?', e); // 不会执行
  });
//  1.4 只要有一个被reject了则PromiseAll则为失败
Promise.all([reject(2), common])
  .then((resp) => {
    console.log(`Promise.all 这里执行了吗? ${resp}`); // 不会执行
  })
  .catch((e) => {
    console.log('这里异常执行了吗?', e); // 这里异常执行了吗? 错误了2
  });

// 2、Promise.race
// 顾名思义，则哪个函数执行快(即最快Settled的,Settled表示fulfilled或者reject)后则中断执行。
// 例子
//  2.1 正常情况下
Promise.race([resolve(2), resolve(3)]).then((resp) => {
  console.log(`Promise.race ${resp}`); // 2 因为前面的耗时2s,后面的耗时3s,2s比3s快则先返回2
});
//  2.1 若函数发生异常
//      2.1.1 异常先于fulfilled执行
//      值得一看的是，这里并没有函数是执行，即使函数抛出异常在catch也不会被捕获到
Promise.race([reject(1), resolve(2)])
  .then(
    (resp) => {
      console.log(`Promise.race 异常先于fulfilled执行 ${resp}`); // 不会执行
    },
    (reject) => {
      console.log(`Promise.race 2.1.1  异常先于fulfilled执行 reject ${reject}`); // Promise.race 2.1.1  异常先于fulfilled执行 reject 1`  注意这里捕获异常只能在这写，这个非常重要!!!!!!
    }
  )
  .catch((error) => {
    `Promise.race 2.1.1  异常先于fulfilled执行 error ${error}`; // 这个函数无论如何都不会执行 !!!!!
  });
//      2.1.2异常后于fulfilled执行，则可以正常返回
Promise.race([reject(2), resolve(1)])
  .then(
    (resp) => {
      console.log(`Promise.race 异常后于fulfilled执行 ${resp}`); // Promise.race 异常后于fulfilled执行 1
    },
    (reject) => {
      console.log(`Promise.race 2.1.2  异常先于fulfilled执行 reject ${reject}`); // 不会执行，因为resolve(1)先fulfilled
    }
  )
  .catch((e) => {
    `Promise.race 2.1.2 异常后于fulfilled执行 异常${e}`; // 不这个函数无论如何都不会执行 !!!!!
  });
//  2.2 若某个函数不更改状态
//  只要数组中有一个为fulfilled则函数结束
Promise.race([common, resolve(1)]).then((resp) => {
  console.log(`Promise.race ${resp}`); // Promise.race 1
});

// 3、Promise.Any
// 只要其中的一个promise成功(注意前提条件需要是成功的，上面的any则是settled的)，就返回那个已经成功的promise。如果可迭代对象中没有一个promise成功（即所有的promises都失败/拒绝），就返回一个失败的promise和AggregateError类型的实例。
// 详情见文件夹：2021/ promise.any
