/*
 * @description 异步迭代器
 */

// 在循环时可以进行一步操作

let i = 0;
const sync = () => {
  setTimeout(() => {
    i++;
    return i;
  });
};

let j = 0;
const async = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(j);
      j++;
      return j;
    });
  });
};

const arr = [1, 2, 3, 4, 5];

const fn = () => {
  arr.forEach(async (item) => {
    let x = await async(); // 这里可以看书异步操作会进行等待
    let y = await sync();
    console.log(x, y);
  });
};

const fn2 = async () => {
  for await (const argument of arr) {
    let x = await async();
    let y = await sync();
    console.log(x, y);
  }
};

fn();
fn2()

