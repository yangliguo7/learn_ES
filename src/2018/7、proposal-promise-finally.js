/*
 * @description promise finally
 */

// promise原型上挂载了finally方法，他表示一定会执行，无论你是resolve还是reject。对标于当你try catch时写的finally

// 例子
const x = new Promise((resolve, reject) => {
  resolve(1);
});
x.finally((result) => {
  console.log('函数一定会执行 ', result); // 这里result时undefined
});

const y = new Promise((resolve, reject) => {
  reject(1);
});
y.finally((result) => {
  console.log('函数一定会执行 ', result); // 这里result时undefined
});

// 也可以写成
// const z = new Promise((resolve, reject) => {
//     reject(1);
// }).finally((result) => {
//     console.log('函数一定会执行 ', result); // 这里result时undefined
// });



// 这里两个finally是一定会执行的
