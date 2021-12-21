/*
 * @description 正则匹配unicode编码
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode
 * @link https://unicode-table.com/cn/#basic-latin
 * @link https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
 */

// unicode编码又叫统一码/万国码,是计算机科学领域里的一项业界标准，包括字符集、编码方案等。
// Unicode是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。
// 扩展：
// 字符编码：
// 由于计算机是美国人发明的，因此，最早只有127个字符被编码到计算机里，也就是大小写英文字母、数字和一些符号，这个编码表被称为ASCII编码。127字符的ASCII,即 A65,a97。其中ASCII编码一个字符是一个字节。
// 后来有了中文，中文得两个字节 就有了GB2312。所以各个国家有不同的编码集，为了统一这种编码就有了unicode编码。
// 一个符号可能有多种Unicode属性，属性则有 binary ("boolean-like") 和 non-binary 之分。

// 语法：
// \p{} 或者 \P{} 去识别unicode编码，\P 为 \p 取反，需要注明修饰符 u
// \p{Unicode属性值}
// \p{Unicode属性名=Unicode属性值}
// \p{UnicodeBinary属性名}
// \P{Unicode属性值}
// \P{UnicodeBinary属性名}

// 修饰符 u 表示匹配一个unicode修饰符
// 例如：
let str = '这是unicode字符';
let reg = /\u8fd9\u662funicode\u5b57\u7b26/u; // 这是unicode字符
reg.test(str); // true

// 上面说到的binary和non-binary又可以分为
// 1、General_Category  https://unicode.org/reports/tr18/#General_Category_Property
// 2、Script  https://unicode.org/reports/tr24/#Script
// 3、Script_Extensions  https://unicode.org/reports/tr24/#Script_Extensions

// 例
let story = 'It’s the Cheshire Cat: now I shall have somebody to talk to. \n \r 123 👌';

// 1、想匹配大写字母 大写字母是General_Category中的letter中的Lu ;
story.match(/\p{General_Category=Lu}/gu); // ['I', 'C', 'C', 'I']
// 和上面相同
story.match(/\p{Lu}/gu);  // ['I', 'C', 'C', 'I']
// \P与\p相反
story.match(/\P{Lu}/gu);  // 这里匹配除了['I', 'C', 'C', 'I']的字符,包括\n\r

// 使用概率很小 这里不赘述了，同步link有相关链接






