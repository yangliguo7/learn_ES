/*
 * @description 字符串trim
 */

// 删除首位字符空位。针对trim进行调整、之前使用trimLeft/trimRight;修改为trimStart/trimEnd；对标padStart/padEnd
// 对能被正则\s匹配到的字符串，将会去除。返回的是一个新字符串；底层用的replace正则\s；
// 注：正则\s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [\f\n\r\t\v]。注意 Unicode 正则表达式会匹配全角空格符

const common = "   123 ";
const rStr = "\r123\r";
const tStr = "\t123\t";
const nStr = "\n123\n";
const bStr = "\b123\b";
// 我这里就不一一列举了；只要能被正则/s匹配上的起始或者末尾字符串都会被替代

// 基本用法
// 1、trim 全部字符串消失
console.log(rStr.trim()); // 123
console.log(common.trim()); // 123

// 2、只trim起始空白字符
console.log(tStr.trimStart()); // 123 但是其实这里是 123\t ; 如果你把tStr = tStr.trimStart() 输出 tStr ('123\t')
// 等同于 trimLeft
console.log(tStr.trimLeft()); // 123

// 3、只trim末尾空白字符
console.log(nStr.trimEnd()); // 123 同上；
// 等同于 trimRight
console.log(nStr.trimRight());


// 扩展
// 1、转义字符
//   \0	空字符
//   \'	单引号
//   \"	双引号
//   \\	反斜杠
//   \n	换行
//   \r	回车
//   \v	垂直制表符
//   \t	水平制表符
//   \b	退格
//   \f	换页
//   \uXXXX	unicode 码
//   \u{X} ... \u{XXXXXX}	unicode codepoint
//   \xXX	Latin-1 字符(x小写)

// 2、padStart/padEnd
// 见 https://github.com/YangLG-7/learn_ES/blob/master/src/2017/2%E3%80%81String_padding.js
