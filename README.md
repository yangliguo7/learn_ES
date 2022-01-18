# es6+ 语法解析

本文是介绍 es2016 之后的每一年的语法特性，内置了 babel、方便查看每个新的 api 是如何进行工作的，你可以执行`npm run babel`在 lib 下可查看转译后的代码。

## 2016 年新特性

- Array.prototype.includes ([数组是否包含某个数据 `includes`](https://github.com/YangLG-7/learn_ES/blob/master/src/2016/1%E3%80%81Array.prototype.includes.js))
- Exponentiation operator ([指数操作 `**`](https://github.com/YangLG-7/learn_ES/blob/master/src/2016/2%E3%80%81Exponentiation_operator.js))

## 2017 年新特性

- Object.values/Object.entries ([遍历对象 `Object.values/entries`](https://github.com/YangLG-7/learn_ES/blob/master/src/2017/1%E3%80%81Object.values_entires.js))
- String padding ([填充字符串 `String.padStart/padEnd`](https://github.com/YangLG-7/learn_ES/blob/master/src/2017/2%E3%80%81String_padding.js))
- Object.getOwnPropertyDescriptors ([获取对象描述](https://github.com/YangLG-7/learn_ES/blob/master/src/2017/3%E3%80%81Object.getOwnPropertyDescriptors.js))
- Trailing commas in function parameter lists and calls ([函数的最后一个参数可以加逗号](https://github.com/YangLG-7/learn_ES/blob/master/src/2017/4%E3%80%81Trailing%20commas%20in%20function%20parameter%20lists%20and%20calls.js))
- Async functions ([处理异步函数 `async await`](https://github.com/YangLG-7/learn_ES/blob/master/src/2017/5%E3%80%81Async%20Function.js))
- Shared memory and atomics ([**_PR Welcome_**](https://github.com/YangLG-7/learn_ES/blob/master/src/2017/6%E3%80%81Shared%20memory%20and%20atomics.js))

## 2018 年新特性

- Lifting template literal restriction ([模板字符串](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/1%E3%80%81Lifting%20template%20literal%20restriction.js))
- add s flag for regular expressions ([正则修饰符匹配任意字符串 `s`](<https://github.com/YangLG-7/learn_ES/blob/master/src/2018/2%E3%80%81s%20(dotAll)%20flag%20for%20regular%20expressions.js>))
- RegExp Named Capture Groups ([正则命名捕获 `/(?<NAME>RegExp)/`](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/3%E3%80%81RegExp%20Named%20Capture%20Groups.js))
- Rest/Spread Properties ([扩展运算符 `...`](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/4%E3%80%81Rest_Spread%20Properties.js))
- RegExp Lookbehind Assertions ([正则向后断言 `/(?<=RegExp)RegExp/ /(?<!RegExp)RegExp/`](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/5%E3%80%81RegExp%20Lookbehind%20Assertions.js))
- RegExp Unicode Property Escapes ([正则匹配 unicode 编码 `/\p/ /\P/`](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/6%E3%80%81RegExp%20Unicode%20Property%20Escapes.js))
- Promise.prototype.finally ([Promise 一定会执行的事 `Promise.finally`](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/7%E3%80%81proposal-promise-finally.js))
- Asynchronous Iteration ([循环中可以进行异步操作](https://github.com/YangLG-7/learn_ES/blob/master/src/2018/8%E3%80%81Asynchronous%20Iterators.js))

## 2019 年新特性

- Optional catch binding ([catch 不在要求一定写异常](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/1%E3%80%81proposal-optional-catch-binding.js))
- JSON superset ([**_PR Welcome_**](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/2%E3%80%81JSON%20superset.js))
- Symbol.prototype.description ([Symbol 获取描述 `Symbol.description`](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/3%E3%80%81Symbol.prototype.description.js))
- Function-prototype-toString-revision ([获取函数字符值 `Function.toString`](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/4%E3%80%81Function-prototype-toString-revision.js))
- Object.fromEntries ([含有迭代器属性的可以转换成对象 `Object.fromEntries`](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/5%E3%80%81proposal-object-from-entries.js))
- Well-formed JSON.stringify ([针对 JSON.stringify 对 unicode 的优化](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/6%E3%80%81Well-formed%20JSON.stringify.js))
- String.prototype.trimStart/trimEnd ([字符串 trim `String.trimStart/trimEnd`](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/7%E3%80%81String.prototype.trimStart_trimEnd.js))
- Array.prototype.{flat,flatMap} ([数组扁平化操作 `Array.flat/flatMap`](https://github.com/YangLG-7/learn_ES/blob/master/src/2019/8%E3%80%81Array.prototype.%7Bflat%2CflatMap%7D.js))

## 2020 年新特性

- String.prototype.matchAll ([获取正则表达式所有匹配的结果及分组捕获组的迭代器 `String.matchAll`](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/1%E3%80%81String.prototype.matchAll.js))
- Dynamic import ([动态 import 导入](<https://github.com/YangLG-7/learn_ES/blob/master/src/2020/2%E3%80%81import()/index.mjs>))
- BigInt ([表示任意精度的整数 `BigInt(num)`](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/3%E3%80%81BigInt.js))
- Promise.allSettled ([获取所有 promise 的结果 `Promise.allSettled`](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/4%E3%80%81Promise.allSettled.js))
- global This ([统一化全局 this `globalThis`](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/5%E3%80%81globalThis/index.js))
- for-in enumeration order ([规范 for in 迭代的顺序](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/6%E3%80%81for-in%20enumeration%20order.js))
- Optional Chaining ([可选链 `?.`](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/7%E3%80%81Optional%20Chaining.js))
- Nullish Coalescing ([空值合并运算符 `??`](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/8%E3%80%81Nullish%20Coalescing.js))
- import.meta ([JavaScript 模块暴露特定上下文的元数据属性的对象](https://github.com/YangLG-7/learn_ES/blob/master/src/2020/9%E3%80%81import.meta/index.js))

## 2021 年新特性

- String.prototype.replaceAll ([字符串全局替换 `replaceAll`](https://github.com/YangLG-7/learn_ES/blob/master/src/2021/1%E3%80%81String.prototype.replaceAll.js))
- Promise.any ([任意一个 promise 成功即成功 `Promise.any`](https://github.com/YangLG-7/learn_ES/blob/master/src/2021/2%E3%80%81Promise.any.js))
- WeakRefs ([**_PR Welcome_**](https://github.com/YangLG-7/learn_ES/blob/master/src/2021/3%E3%80%81WeakRefs.js))
- Logical Assignment Operators ([逻辑赋值运算符 `??= &&= ||=`](https://github.com/YangLG-7/learn_ES/blob/master/src/2021/4%E3%80%81Logical%20Assignment%20Operators.js))
- Numeric separators ([数字分割符 `_`](https://github.com/YangLG-7/learn_ES/blob/master/src/2021/5%E3%80%81Numeric%20Separators.js))

### 扩展

#### 1、TC39、ECMA、ECMAScript 三者是什么关系?

```
ECMA是一个组织，TC39是ECMA的组织委员会，负责定义ECMA标准并实现。除了TC39还有TC34,TC35等等。
ECMAScript原则上和js是一个东西，最初js有两套标准，一套是ECMA262，一套ISO/IEC 16262，
因为版权的原因所以称为ECMAScript。
```

[点击这里查看完整的解释](https://segmentfault.com/a/1190000040249076#ecmatc39ecma-262isoiec-16262ecmascriptjavascript%E4%B9%8B%E9%97%B4%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB%E5%91%A2)

#### 2、TC39 流程定义规范?

```
stage0 strawman：任何讨论、想法、改变或者还没加到提案的特性都在这个阶段。只有 TC39 成员可以提交
    ↓
stage1 proposal：提案
    ↓
stage2 draft：草案
    ↓
stage3 candidate：候选
    ↓
stage4 finished:已经准备就绪，该特性会出现在下个版本的 ECMAScript 规范之中
基本上过了 stage4 就已经算上标准特性了
```

[点击这里去查看历年来发布的特性](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)

#### 3、babel

```
babel 只会转换语法而不会转换 api;转换 api 是通过 polyfill
```

#### 4、如何 debugger

```
node --inspect-brk 文件名称
```

#### 5、可以使用`servez`来运行里面的 html

```
npm i servez -g 使用servez开启一个服务
```

#### 6、使用 nvm 来管理 node 版本

```
对于2021和2022的新特性在低版本的node是没办法运行的，建议使用nvm管理node版本，使用最新的node版本食用更加
```
