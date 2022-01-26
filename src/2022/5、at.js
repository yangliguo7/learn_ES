/*
 * @description 对所有基本可索引类提供获取某一下标的值(支持负数，负数代表从后往前)
 */

const arr = Array.from({ length: 5 }).map((item, index) => index);

// 之前获取数组的最后一个，我们需要获取长度然后减一,需要获取length还需要多获取一次arr。
console.log(arr[arr.length - 1]);

// 在新的提案中可以通过at获取数组下标位置的数量

// 获取第一位
console.log(arr.at(0)); // 0

// 可以通过负数则表示从后往前
// 获取最后一位
console.log(arr(-1)); // 4
// 获取倒数第二位
console.log(arr(-2)); // 3

// 如果你对代码进行babel的话
// at: function at(index) {
//     var O = toObject(this);
//     var len = lengthOfArrayLike(O);
//     将参数进行转换 toIntegerOrInfinity ===>var number = +argument;return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
//     var relativeIndex = toIntegerOrInfinity(index); // 参数应该一层Number转换然后0就是0 如果number>0 即向下取整 number < 0 则向上取整
//     var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex; // 大于0则正常arr[relativeIndex] 小于0 则arr[len + relativeIndex] (所以负数的时候需要向上取整，因为和需要和长度相加)
//     return (k < 0 || k >= len) ? undefined : O[k];
// }

// 注：
// 如果获取的下标位置不存在则返回undefined
arr.at(66666); // undefined (66666 > len)
arr.at(-88888); // undefined

arr.at(1.6); // ===> 1.6 > 0 => Math.floor(1.6) => 1 => 1>0 => arr[1]
arr.at(-1.6); // ===> -1.6 < 0 =>Math.ceil(-1.6) => -1 => -1<0 => arr[len + -1] => arr[4]

arr.at(true); // ===> +true ==> 1 ==>..... arr[1]
arr.at(false); // ===> +false ==> 0 ==>..... arr[0]

arr.at('abcdefg'); // ===> +"abcdefg"=>NAN==> 不是num类型==> arr[0]
arr.at(''); // ===> +"0"=>NAN==> 0==>arr[0]

// 对于可索引类都可以使用

// 1、字符String
const str = '-123456';
// 获取第一位
str.at(0); // -1
// 获取最后一位
str.at(-1); // 6
// 处理逻辑与上面相同

// 2、typeArray
const typedArray = new Int8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 获取第一位
typedArray.at(0); // 0
// 获取最后一位
typedArray.at(-1); // 10
// 处理逻辑与上面相同
