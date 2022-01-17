/*
 * @description 字符串全局替换
 */

// 注:返回新字符串并不会操作原始字符串

// 因为String.prototype.replace只能替换成一个字符。
// 例如
'aaaabbb'.replace('a', 'c'); // caaabbb
// 只会匹配到第一个字符
'aaaabbb'.replace(/a/, 'c'); // caaabbb
// 如果你需要全局匹配,则需要把字符串转为正则在加上全局标识g
'aaaabbb'.replace(/a/g, 'c'); // ccccbbb
// 操作麻烦 需要换成正则还得加全局标识

// String.repleaceAll 全局替换字符
'aaaabbb'.replaceAll('a', 'c'); // ccccbbb
// 如果使用正则则必须全局标识
'aaaabbb'.replaceAll(/a/g, 'c');
// 被字符串也可用特殊字符表示
'aaaabbb'.replaceAll(/a/g, '$$'); // $$$$bbb 这里$$相当于一个$
// $$	插入一个 "$"。
// $&	插入匹配的子串。
'aaaabbb'.replaceAll(/a/g, ':$&:'); // ':a::a::a::a:bbb'
// $`	插入当前匹配的子串左边的内容。
'aaaabbb'.replaceAll(/a/g, 'l$`'); // 'l_la_laa_laaa_bbb'
// $'	插入当前匹配的子串右边的内容。
'aaaabbb'.replaceAll(/a/g, "r$'"); // 'raaabbb_raabbb_rabbb_rbbb_bbb' _这里是我自己加的只是为了展示他是如何替换的
// $n 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始。如果不存在第 n个分组，那么将会把匹配到到内容替换为字面量。比如不存在第3个分组，就会用“$3”替换匹配到的内容。
'a1b2c3d4'.replaceAll(/(\D\d)(\D\d)/g, 'r$1'); //ra1_rc3
// a1b2 和c3d4 对应正则(\D\d)(\D\d) $1 表示每次被匹配到中的数据中，第几个括号数值;a1b2对应正则/(\D\d)(\D\d)/ 第一个括号是a1;c3d4对应正则/(\D\d)(\D\d)/ 第一个括号是c3
// 同理 第二个括号分别对应b2和d4
'a1b2c3d4'.replaceAll(/(\D\d)(\D\d)/g, 'r$2'); //rb2_rd4
// 如果超出括号内容即$3不指代任何内容则就指代$3原始字符串
'a1b2c3d4'.replaceAll(/(\D\d)(\D\d)/g, 'r$3'); //r$3_r$3
// $<Name>	 这里Name 是一个分组名称。如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。只有在支持命名分组捕获的浏览器中才能使用。
// /?<name>/ 这是es2018出的正则命名捕获，可以查看文件夹2018/RegExp Named Capture Groups
'a1b2c3d4'.replaceAll(/(?<before>\D\d)(?<after>\D\d)/g, 'r$<before>'); // ra1_rc3
// 和上面一样会将命名捕获到的是内容就行匹配替换
// 如果不存在这样的命名捕获内容则会当成""空内容
'a1b2c3d4'.replaceAll(/(?<before>\D\d)(?<after>\D\d)/g, 'r$<before1111>'); // r_r

// 和replace一样替换也可以使用一个函数
// 指定一个函数作为第二个参数。在这种情况下，当匹配执行后，该函数就会执行。 函数的返回值作为替换字符串。 (注意：上面提到的特殊替换参数在这里不能被使用。) 另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。
'bbbba1b2c3d4aaaa'.replaceAll(/(?<before>\D\d)(?<after>\D\d)/g, (match, p1, p2, offset, string, NamedCaptureGroup) => {
  // match 匹配字符串 $&
  // p1 第一个括号的内容....每一个括号内容就会占据一个参数位，可能p1,p2,p3...
  // offset 匹配的串在源字符串的偏移量，例如匹配到a1b2距离左边4位 c3d4距离左边首位置8位
  // string 原始字符串
  // NamedCaptureGroup 具名捕获到的内容
  console.log(match, p1, p2, offset, string, NamedCaptureGroup); // a1b2 a1 b2 0 a1b2c3d4 [Object: null prototype] { before: 'a1', after: 'b2' }
  const { before, after } = NamedCaptureGroup;
  console.log(before, after); // a1 b2 ;c3 d4
  return 'aaaa'; // return的内容则返回字符串的内容
});
