/*
 * @description 提供一种配置异常的方法使得在抛出异常时可以指定失败原因 {cause:e}
 */
class CustomError extends Error {
  constructor(msg, cause) {
    super(msg);
    this.cause = cause;
  }
}

// 一般情况下如果我们函数需要抛出异常，比如这样
const baseFn = (param) => {
  if (param?.a === 1) {
    throw new Error('参数不能为1');
  } else if (param?.a === 2) {
    throw new Error('参数不能为2');
  }
  return 1;
};

const baseFn1 = (param) => {
  if (param?.b === 1) {
    throw new Error('baseFn1 参数不能为1');
  } else if (param?.b === 2) {
    throw new Error('baseFn1 参数不能为2');
  }
  return 1;
};

// 在我们调用函数的时候如果发生异常我们对异常进行二次包装进行抛出异常，并告知错误原因   ，一般情况下我们会
// 1、直接抛出一个新的异常
const fnA = () => {
  try {
    baseFn({ a: 1 });
  } catch (e) {
    // console.log(e); // Error: 参数不能为1
    throw new Error(`方法1：二次抛出异常原因：${e.message}`); // Error: 二次抛出异常原因：参数不能为1
  }
};
fnA();
// 2、使用自定义异常
const fnB = () => {
  try {
    baseFn({ a: 1 });
  } catch (e) {
    // console.log(e); // Error: 参数不能为1
    throw new CustomError(`方法2：二次抛出异常`, e.message); // Error: 二次抛出异常、参数不能为1
  }
};
fnB();

// 让我们使用新的特性，在异常中新增cause属性，提供给异常失败的原因
// 例：
const fnC = (param) => {
  try {
    baseFn(param);
  } catch (e) {
    throw new Error('执行baseFn函数执行失败', {
      cause: e, // 这里使用了cause表明失败的原因
    });
  }

  try {
    baseFn1(param);
  } catch (e) {
    throw new Error('函数baseFn1执行失败', {
      cause: e,
    });
  }
};

try {
  fnC({
    a: 1,
  });
} catch (e) {
  console.log(e); // 执行baseFn函数执行失败 这里就是正常的异常的信息
  console.log(e.cause); // 参数不能为1 这里我们通过异常可以获取到失败的原因
}

try {
  fnC({
    b: 2,
  });
} catch (e) {
  console.log(e); // 执行baseFn1函数执行失败
  console.log(e.cause); // baseFn1 参数不能为2
}
