/*
 * @description 模板字串 扩大es5的模板字符串的功能
 * @link https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals
 * @link https://tc39.es/proposal-template-literal-revision/
 */

// 在es2015中模板字符串只是解决了部分问题，只是可以简单的嵌入一些字面值，换行。而在es6中扩大了模板字符串的功能(函数运算、字符穿插)等

// 1、换行的功能
const start = 'start';
const end = 'end';
// 最原始
console.log(start + '\n' + end);
console.log(`${start}\n${end}`);
// 新版 es2015 也可以以这种形式进行换行
console.log(`${start}
${end}
`);

// 2、新增运算
const sum = (a, b) => a + b;
console.log(`1 + 2 = ${sum(1, 1) + 1}`); // 1 + 2 = 3
console.log(`aaa${sum(1, 1) === 2 ? 'bbb' : 'ccc'}  `); // aaabbb 如果是false则是aaaccc

// 3、对模板字符串进行函数操作
const num = 777;
const str = '我是模板';
const arr = [1, '2', null, undefined, () => {}];
const templateStr = `这是数字${num},这是字符串${str},这是数组${arr}`; // 这是数字777,这是字符串我是模板,这是数组1,2,,,()=>{} 注意这里数组在模板字符串中的表现
const operateTemplate = (arr, ...args) => {
  console.log(arr); // [ '这是数字', ',这是字符串', ',这是数组', '\n' ]
  console.log(args); // [ 777, '我是模板', [ 1, '2', null, undefined, [Function (anonymous)] ] ]
  // 可以看出在以这种方式对模板字符串进行函数操作时
  // 第一个参数是数组，值为每个原始字符串，根据模板变量进行分割
  const [a, b, c] = arr; // a = '这是数字' ; b = ',这是字符串' ; c = ',这是数组'
  // 第二个参数为数组 值为模板字符串的每个内容
  const [v1, v2, v3] = args; // v1 = 777 ; v2 = '我是模板' ; v3 = [ 1, '2', null, undefined, [Function (anonymous)] ] 注意这里是能看到null/undefined
  // 这里可以做逻辑处理
  if (args.length > 2) return '我是经过函数操作后的字符串';
  // 也可以返回成一个函数，像
  return (params) => {
    return args.join(params);
  };
};
let finalTemplateStr = operateTemplate`这是数字${num},这是字符串${str},这是数组${arr}\n`; // 注意这里需要是模板字符串源字符串
console.log(finalTemplateStr); // '我是经过函数操作后的字符串'
finalTemplateStr = operateTemplate`这是数字${num},这是字符串${str}`;
console.log(finalTemplateStr("分割符号")); // 777分割符号我是模板

// 在es6中，认为模板字符串应该允许嵌入一些领域特定语言(DSL), 但是不同语言对一些转义字符解析是不一致的从而新的模板字符串取消对转义序列的限制
// 对于无法解析的字符将会解析成undefined，但是使用String.raw可以获取源数据，这一修订是针对于函数操作的那种标签处 理，对于纯模板字符串
// 例如：
// let x = `aaa /unicode ` | `aaa ${sum} /unicode` => Uncaught SyntaxError: Invalid Unicode escape sequence
// 自ES2016起，带标签的模版字面量遵守以下转义序列的规则
// Unicode字符以"\u"开头，例如\u00A9
// Unicode码位用"\u{}"表示，例如\u{2F804}
// 十六进制以"\x"开头，例如\xA9
// 八进制以"\"和数字开头，例如\251
// 所以对于\unicode以u开头是无法解析的
console.log(`\u00A9 \u{2F804} \xA9 `) // 模板里不能直接使用8进制 但是可以通过这种 console.log(`${"\251"}`)

// 扩展
// String.raw 是用来获取一个模板字符串的原始字符串的



