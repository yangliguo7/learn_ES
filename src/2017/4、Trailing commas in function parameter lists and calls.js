/*
* @description 函数的最后一个参数可以加逗号
*/

// 之前
function previousFunction(
    param1,
    param2
) {
    console.log('这是之前的写法')
}

// 现在
function currentFunction(
    param1,
    param2, // 区别在这
) {
    console.log('这是现在的写法')
}

// 这样写的好处就是当你需要修改参数的时候，你只需要改动一行而不是两行
