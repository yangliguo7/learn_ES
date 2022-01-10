/*
 * @description 提供了一个标准的方式来获取不同环境下的全局this对象（也就是全局对象自身）
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis
 * @link https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
 * @link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP
 * @link https://nwjs.io/
 */

// 因为不同环境下获取全局对象的语句不同。像在B端可通过 window、self 或者 frames 取到全局对象。node端又是global。具体可以看下表
// |                           | Browsers   | IE | Node | NW | web workers |
// | self                      | Y          | Y  |      |    | Y           |
// | window                    | Y          | Y  |      | Y  |             |
// | global                    |            |    | Y    |    |             |
// | Function('return this')() | breaks CSP | Y  | Y    | Y  |             |

// 注：
// 1、CSP 是内容安全策略
// 2、NM 原名 node-webkit）是一个基于 Chromium 和 node.js 的应用运行时，通过它可以用 HTML 和 JavaScript 编写原生应用程序。它还允许您从 DOM 调用 Node.js 的模块 ，实现了一个用所有 Web 技术来写原生应用程序的新的开发模式

// 为了解决这一问题，提供了globalThis

// 例:
const x = globalThis; // 如果你运行在browser,则时window；如果你运行在node则是全局全局对象
// browser
if (typeof window === 'object') console.log('browser', globalThis === window); // true
// node
if (typeof global === 'object') console.log('node', globalThis === global); // true
// 也可以往上绑定数据，例
globalThis.x = {
  x: 1,
};
if (typeof window === 'object') console.log('browser', window.x); // { x:1 }
if (typeof global === 'object') console.log('node', global.x); // { x:1 }

// 注意：
// globalThis并不是全局对象；具体查看当前文件夹下的parent.html内容

// 如果你查看babel代码可以看到，代码也是根据环境去做不用的判断。
// module.exports =
//     check(typeof globalThis == 'object' && globalThis) ||
//     check(typeof window == 'object' && window) ||
//     check(typeof self == 'object' && self) ||
//     check(typeof global == 'object' && global) ||
//     (function () { return this; })() || Function('return this')();


