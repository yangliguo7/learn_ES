# es6+ 语法解析

本文是介绍es2016之后的语法特性,本来是想取名叫es6+的但是校验不通过,如果你还不熟悉es6,建议前往http://es6-features.org/ (推荐阅读)或者阮一峰的es6中文教程https://es6.ruanyifeng.com/

### PS:

为了更好的理解语法是如何工作的，项目中预设了babel插件，你可以执行`npm run babel`在lib下可查看转译后的代码。

### 扩展

1、TC39、ECMA、ECMAScript三者是什么关系?

ECMA是一个组织，TC39是ECMA的组织委员会，负责定义ECMA标准并实现。除了TC39还有TC34,TC35等等。ECMAScript原则上和js是一个东西，最初js有两套标准，一套是ECMA262，一套ISO/IEC 16262，因为版权的原因所以称为ECMAScript。感兴趣的可以查看

[]:https://segmentfault.com/a/1190000040249076#ecmatc39ecma-262isoiec-16262ecmascriptjavascript%E4%B9%8B%E9%97%B4%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB%E5%91%A2

2、TC39流程定义规范?

![](C:\Users\yW0041221\Pictures\3752799174-60d8b498f33c9.png)

stage0 strawman：任何讨论、想法、改变或者还没加到提案的特性都在这个阶段。只有TC39成员可以提交

stage1 proposal：提案

stage2 draft：草案

stage3 candidate：候选

stage4 finished:已经准备就绪，该特性会出现在下个版本的ECMAScript规范之中

基本上过了stage4就已经算上标准特性了

[]:https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md

3、babel

babel只会转换语法而不会转换api，转换api是通过polyfill

